import { Logger } from 'loglevel'
import { Metadata } from '@grpc/grpc-js'
import { TelemetryReceiverClient } from '../../grpc/teletubby_grpc_pb'
import { TelemetryRequest, TelemetryAction } from '../../grpc/teletubby_pb'
import { CallsignsLookup, CallsignsLookupType } from '../Callsigns'
import { PrefixLogger } from '../PrefixLogger'
import { telemetryActionType } from './TelemetryActionRunner'

export class TelemetryActionRunnerList {
  logger: Logger
  constructor() {
    this.logger = PrefixLogger.getInstance('TelemetryAction')
  }

  public run = (
    actionType: telemetryActionType,
    sources: Array<string>,
    callsigns: CallsignsLookup,
    grpcClient: TelemetryReceiverClient,
    metadata: Metadata,
    subscriberId: string
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    if (callsigns.lookupType === CallsignsLookupType.List) {
      const lookupValue = callsigns.lookupValue as string[]
      const req = new TelemetryRequest()
      const actions = []
      const action = new TelemetryAction()
      action.setOperation(actionType)
      action.setCallsignsList(lookupValue)
      action.setSourcesList(sources)
      actions.push(action)
      req.setRequestedactionsList(actions)
      req.setSubscriberid(subscriberId)
      // Send the message to back-end.
      grpcClient.requestTelemetry(req, metadata, (err, ack) => {
        if (err) {
          self.logger.error('grpcClient.requestTelemetry List', err)
        }
      })
    }
  }
}
