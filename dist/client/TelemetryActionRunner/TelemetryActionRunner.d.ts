import { Logger } from 'loglevel';
import { Metadata } from '@grpc/grpc-js';
import { TelemetryReceiverClient } from '../../grpc/teletubby_grpc_pb';
import { CallsignsLookup } from '../Callsigns';
export declare type telemetryActionType = 'subscribe' | 'unsubscribe';
export declare class TelemetryActionRunner {
    logger: Logger;
    constructor();
    run: (actionType: telemetryActionType, sources: Array<string>, callsigns: CallsignsLookup, grpcClient: TelemetryReceiverClient, metadata: Metadata, subscriberId: string | undefined, projectId: string) => void;
}
