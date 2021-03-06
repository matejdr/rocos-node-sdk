import { Logger } from 'loglevel';
import { Metadata } from '@grpc/grpc-js';
import { TelemetryReceiverClient } from '../../grpc/teletubby_grpc_pb';
import { CallsignsLookup } from '../Callsigns';
import { Subject } from 'rxjs';
import { CustomTelemetryMessage } from '../CustomTelemetryMessage';
export declare type telemetryActionType = 'subscribe' | 'unsubscribe';
export declare class TelemetryActionRunner {
    logger: Logger;
    constructor();
    run: (actionType: telemetryActionType, sources: Array<string>, callsigns: CallsignsLookup, grpcClient: TelemetryReceiverClient, metadata: Metadata, subscriberId: string | undefined, projectId: string, subject: Subject<CustomTelemetryMessage>) => void;
}
