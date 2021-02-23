import { Logger } from 'loglevel'
import { Metadata, ClientDuplexStream } from '@grpc/grpc-js'
import { Subject } from 'rxjs'
import { TelemetryReceiverClient } from '../grpc/teletubby_grpc_pb'
import {
  ReceiverStreamMessage,
  TelemetryMessage,
  TelemetryStreamMessage,
} from '../grpc/teletubby_pb'
import { PrefixLogger } from './PrefixLogger'
import { CustomTelemetryMessage } from './CustomTelemetryMessage'
import { CallsignsLookup, CallsignsQuery } from './Callsigns'
import { TelemetryActionRunner } from './TelemetryActionRunner/TelemetryActionRunner'
import { TelemetryError, errorCodes } from './TelemetryError'

export class TelemetrySubscriber {
  logger: Logger
  projectId: string
  sources: Array<string>
  callsigns: CallsignsLookup
  grpcClient: TelemetryReceiverClient
  subject: Subject<CustomTelemetryMessage>
  metadata: Metadata
  activeCall:
    | ClientDuplexStream<ReceiverStreamMessage, TelemetryStreamMessage>
    | undefined
  subscriberId: string | undefined

  constructor(
    projectId: string,
    sources: Array<string>,
    callsigns: CallsignsLookup,
    token: string,
    grpcClient: TelemetryReceiverClient
  ) {
    this.logger = PrefixLogger.getInstance('TelemetrySubscriber')
    this.projectId = projectId
    this.sources = sources
    this.callsigns = callsigns
    this.grpcClient = grpcClient
    this.subject = new Subject()
    this.metadata = new Metadata()
    this.metadata.add('authorization', token)
    this.metadata.add('r-p', this.projectId)
    this.registerStreamReceiver()
  }

  private registerStreamReceiver = () => {
    this.logger.info('registerStreamReceiver', this)
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    const call = this.grpcClient.registerStreamReceiver(this.metadata)
    call.on('data', function (msg: TelemetryMessage) {
      try {
        const message = new CustomTelemetryMessage(msg)
        self.onData(message)
      } catch (e) {
        self.subject.error(
          new TelemetryError(errorCodes.STREAM_ERROR, e)
        )
      }
    })
    call.on('status', status => {
      self.logger.debug('registerStreamReceiver', 'status', status)
    })
    call.on('end', (status: any) => {
      self.logger.debug('registerStreamReceiver', 'end', status)
    })
    call.on('error', function (error) {
      self.logger.error('registerStreamReceiver', 'error', error)
      self.subject.error(
        new TelemetryError(errorCodes.STREAM_ERROR, error)
      )
    })
    this.activeCall = call
    return function () {
      call.cancel()
    }
  }

  public onData = (message: CustomTelemetryMessage) => {
    const source = message.source
    const callsign = message.callsign
    let isRobotMessage = true

    message.projectId = this.projectId

    switch (source) {
      case '/rocos/agent/telemetry/subscribed':
        const json = message.payload
        this.subscriberId = json.subscriberId
        new TelemetryActionRunner().run(
          'subscribe',
          this.sources,
          this.callsigns,
          this.grpcClient,
          this.metadata,
          this.subscriberId,
          this.projectId,
          this.subject
        )
        isRobotMessage = false
        break
      case '/rocos/agent/telemetry/noop':
        isRobotMessage = false
        break
      default:
        isRobotMessage = true
        break
    }

    if (this.isRegisteredMessage(callsign, source)) {
      this.subject.next(message)
    } else {
      if (isRobotMessage) {
        // All messages received should be subscribed.
        this.logger.error('onData', 'received unsubscribed message', {
          callsign: callsign,
          source: source,
          callsigns: this.callsigns,
          sources: this.sources,
        })
        this.subject.error(
          new TelemetryError(
            errorCodes.SUBSCRIBER_ERROR,
            'No subscriber exists'
          )
        )
      }
    }
  }

  private isRegisteredMessage = (callsign: string, source: string) => {
    const isFoundSource = this.sources.indexOf(source) !== -1
    let isFoundCallsign
    if (!(this.callsigns.lookupValue instanceof CallsignsQuery)) {
      isFoundCallsign = this.callsigns.lookupValue.indexOf(callsign) !== -1
    } else {
      isFoundCallsign = true
    }
    return isFoundCallsign && isFoundSource
  }

  public unsubscribe = () => {
    this.logger.info('unsubscribe')
    new TelemetryActionRunner().run(
      'unsubscribe',
      this.sources,
      this.callsigns,
      this.grpcClient,
      this.metadata,
      this.subscriberId,
      this.projectId,
      this.subject
    )
    if (this.activeCall) {
      this.activeCall.cancel()
      this.activeCall = undefined
    }
  }
}
