import { Logger } from 'loglevel'
import { Metadata } from '@grpc/grpc-js'
import { TelemetryReceiverClient } from '../../grpc/teletubby_grpc_pb'
import { CallsignsLookup, CallsignsLookupType } from '../Callsigns'
import { PrefixLogger } from '../PrefixLogger'
import { TelemetryActionRunnerList } from './TelemetryActionRunnerList'
import { TelemetryActionRunnerQuery } from './TelemetryActionRunnerQuery'
import { Subject } from 'rxjs'
import { CustomTelemetryMessage } from '../CustomTelemetryMessage'

export type telemetryActionType = 'subscribe' | 'unsubscribe'

export class TelemetryActionRunner {
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
    subscriberId: string | undefined,
    projectId: string,
    subject: Subject<CustomTelemetryMessage>
  ) => {
    if (!subscriberId || !projectId) {
      this.logger.warn(
        actionType,
        'without subscriberId or projectId - message will not send out',
        {
          subscriberId: subscriberId,
          projectId: projectId,
        }
      )
      return
    }
    if (callsigns.lookupType === CallsignsLookupType.List) {
      new TelemetryActionRunnerList().run(
        actionType,
        sources,
        callsigns,
        grpcClient,
        metadata,
        subscriberId,
        subject
      )
    } else if (callsigns.lookupType === CallsignsLookupType.Query) {
      new TelemetryActionRunnerQuery().run(
        actionType,
        sources,
        callsigns,
        grpcClient,
        metadata,
        subscriberId,
        subject
      )
    }

    this.logger.debug(actionType, 'grpcClient.requestTelemetry', subscriberId)
  }
}
