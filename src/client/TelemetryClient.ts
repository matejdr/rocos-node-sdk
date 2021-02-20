import { Logger, LogLevelDesc } from 'loglevel'
import { PrefixLogger } from './PrefixLogger'
import { TelemetryReceiverClient } from '../grpc/teletubby_grpc_pb'
import { TelemetrySubscriber } from './TelemetrySubscriber'
import { CallsignsLookup, CallsignsQuery } from './Callsigns'
import * as grpc from '@grpc/grpc-js'

export class TelemetryClient {
  private logger: Logger
  private readonly token: string
  private readonly grpcClient: TelemetryReceiverClient | undefined
  private subscribers: Array<TelemetrySubscriber> = []

  /**
   * Create a new Telemetry client wuth a service hostnamre and a token
   *
   * @param hostname - Hostname of the stream service.
   * @param token - The token for authorization.
   *
   * @beta
   */
  constructor(hostname: string, token: string) {
    this.logger = PrefixLogger.getInstance('TelemetryClient')
    this.token = token
    try {
      this.grpcClient = new TelemetryReceiverClient(
        hostname,
        // TODO: do not know how you do authentication
        grpc.credentials.createInsecure()
      )
    } catch (e) {
      this.logger.error('client can not be created')
      this.logger.debug(e)
    }
  }

  /**
   * Subscribe to telemetry events.
   *
   * @remarks
   * This is the main method for connecting service data to your application.
   *
   * @param projectId - id of the project
   * @param callsigns - An array of string callsigns or a callsign query
   * @param sources - An array of string sources
   * @returns The TelemetrySubscriber or nothing if an error occurs.
   *
   * @beta
   */
  public subscribe = (
    projectId: string,
    callsigns: string[] | CallsignsQuery,
    sources: Array<string>
  ) => {
    if (!this.grpcClient) {
      this.logger.error('client does not exist')
      return
    }
    this.logger.info('subscribe with callsigns')

    const sub = new TelemetrySubscriber(
      projectId,
      sources,
      new CallsignsLookup(callsigns),
      this.token,
      this.grpcClient
    )

    this.logger.debug('subscribing', sub)

    this.subscribers.push(sub)

    return sub
  }

  /**
   * Unsubscribe a telemetry event.
   *
   * @param sub - TelemetrySubscriber
   * @returns void
   *
   * @beta
   */
  public unsubscribe = (sub: TelemetrySubscriber) => {
    this.logger.info('unsubscribing', sub)
    const foundSubscriber = this.subscribers.indexOf(sub)
    if (foundSubscriber >= 0) {
      this.subscribers[foundSubscriber].unsubscribe()
    } else {
      this.logger.warn('subscriber not found')
    }
  }

  /**
   * Unsubscribe all telemetry events.
   *
   * @returns void
   *
   * @beta
   */
  public unsubscribeAll = () => {
    this.logger.info('unsubscribing all')
    this.subscribers.forEach(subscriber => {
      subscriber.unsubscribe()
    })
  }

  public enableDebugMode = (on = true) => {
    if (on) {
      this.logger.enableAll()
    } else {
      this.logger.disableAll()
    }
  }

  public setDebugLevel = (level: LogLevelDesc) => {
    this.logger.setLevel(level)
  }
}
