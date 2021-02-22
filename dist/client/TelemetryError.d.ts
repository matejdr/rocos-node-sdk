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
    constructor(code: string, message?: string);
    static createFromGrpcClient(code: string, err: ServiceError): TelemetryError;
    static createFromError(code: string, err: Error): TelemetryError;
}
