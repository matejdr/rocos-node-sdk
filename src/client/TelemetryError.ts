import { ServiceError } from '@grpc/grpc-js'

export const errorCodes = {
  STREAM_ERROR: 'STREAM_ERROR',
  SUBSCRIBER_ERROR: 'SUBSCRIBER_ERROR',
  CLIENT_ERROR: 'CLIENT_ERROR',
  GRPC_CLIENT_ERROR: 'GRPC_CLIENT_ERROR',
}
export class TelemetryError extends Error {
  code: string
  extraData?: any
  constructor(code: string, message?: string) {
    super(message)
    this.code = code
  }

  public static createFromGrpcClient(code: string, err: ServiceError) {
    const error = new TelemetryError(code, err.message)
    error.name = err.name
    error.stack = err.stack
    error.extraData = {
      code: err.code,
      details: err.details,
      metadata: err.metadata,
    }

    return error
  }

  public static createFromError(code: string, err: Error) {
    const error = new TelemetryError(code, err.message)
    error.name = err.name
    error.stack = err.stack
    return error
  }
}
