import { TelemetryMessage } from '../grpc/teletubby_pb';
export declare class CustomTelemetryMessage {
    callsign: string;
    source: string;
    createdAt: number;
    payload: any;
    type: string;
    receivedAt: Date;
    projectId: string | undefined;
    constructor(msg: TelemetryMessage);
}
