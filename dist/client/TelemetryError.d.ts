import { ServiceError } from '@grpc/grpc-js';
export declare const errorCodes: {
    STREAM_ERROR: string;
    SUBSCRIBER_ERROR: string;
    CLIENT_ERROR: string;
    GRPC_CLIENT_ERROR: string;
};
export declare class TelemetryError extends Error {
    code: string;
    extraData?: any;
    constructor(code: string, err?: string | Error);
    static createFromGrpcClient(code: string, err: ServiceError): TelemetryError;
}
