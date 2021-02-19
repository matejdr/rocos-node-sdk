import { Logger } from 'loglevel';
import { Metadata, ClientDuplexStream } from '@grpc/grpc-js';
import { Subject } from 'rxjs';
import { TelemetryReceiverClient } from '../grpc/teletubby_grpc_pb';
import { ReceiverStreamMessage, TelemetryStreamMessage } from '../grpc/teletubby_pb';
import { CustomTelemetryMessage } from './CustomTelemetryMessage';
import { CallsignsLookup } from './Callsigns';
export declare class TelemetrySubscriber {
    logger: Logger;
    projectId: string;
    sources: Array<string>;
    callsigns: CallsignsLookup;
    grpcClient: TelemetryReceiverClient;
    subject: Subject<CustomTelemetryMessage>;
    metadata: Metadata;
    activeCall: ClientDuplexStream<ReceiverStreamMessage, TelemetryStreamMessage> | undefined;
    subscriberId: string | undefined;
    constructor(projectId: string, sources: Array<string>, callsigns: CallsignsLookup, token: string, grpcClient: TelemetryReceiverClient);
    private registerStreamReceiver;
    private onData;
    private isRegisteredMessage;
    unsubscribe: () => void;
}
