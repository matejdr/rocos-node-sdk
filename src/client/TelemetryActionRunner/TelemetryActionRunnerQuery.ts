import { Logger } from 'loglevel'
import { Metadata } from '@grpc/grpc-js'
import { TelemetryReceiverClient } from '../../grpc/teletubby_grpc_pb'
import {
  Predicate,
  Query,
  QueryOrPredicate,
  TelemetryQueryRequest,
} from '../../grpc/teletubby_pb'
import {
  CallsignsLookup,
  CallsignsLookupType,
  CallsignsQuery,
} from '../Callsigns'
import { PrefixLogger } from '../PrefixLogger'
import { telemetryActionType } from './TelemetryActionRunner'
import { Subject } from 'rxjs'
import { CustomTelemetryMessage } from '../CustomTelemetryMessage'
import { errorCodes, TelemetryError } from '../TelemetryError'

export class TelemetryActionRunnerQuery {
  logger: Logger
  constructor() {
    this.logger = PrefixLogger.getInstance('TelemetryActionRunner')
  }

  public run = (
    actionType: telemetryActionType,
    sources: Array<string>,
    callsigns: CallsignsLookup,
    grpcClient: TelemetryReceiverClient,
    metadata: Metadata,
    subscriberId: string,
    subject: Subject<CustomTelemetryMessage>
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    if (callsigns.lookupType === CallsignsLookupType.Query) {
      const lookupValue = callsigns.lookupValue as CallsignsQuery
      const req = new TelemetryQueryRequest()
      req.setSubscriberid(subscriberId)
      req.setSourcesList(sources)
      req.setOperation(actionType)
      const telemetryQuery = new Query()
      telemetryQuery.setOperation(lookupValue.operation)
      const queryOrPredicatesList: Array<QueryOrPredicate> = []
      lookupValue.predicates.forEach(function (callsignsPredicate) {
        const queryOrPredicate = new QueryOrPredicate()
        const predicate = new Predicate()
        predicate.setAttribute(callsignsPredicate.attribute)
        predicate.setOperation(callsignsPredicate.operation)
        predicate.setValue(callsignsPredicate.value)
        queryOrPredicate.setPredicate(predicate)
        queryOrPredicatesList.push(queryOrPredicate)
      })
      telemetryQuery.setQueryorpredicatesList(queryOrPredicatesList)
      req.setCallsignquery(telemetryQuery)
      // Send the telemetry query request to back-end.
      grpcClient.requestTelemetryQuery(req, metadata, (err, ack) => {
        if (err) {
          self.logger.error('grpcClient.requestTelemetry Query', err)
          subject.error(
            TelemetryError.createFromGrpcClient(
              errorCodes.GRPC_CLIENT_ERROR,
              err
            )
          )
        }
      })
    }
  }
}
