// GENERATED CODE -- DO NOT EDIT!

// package: teletubby.v1
// file: teletubby.proto

import * as teletubby_pb from './teletubby_pb'
import * as grpc from '@grpc/grpc-js'

interface ITelemetryReceiverService
  extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  registerStreamReceiver: grpc.MethodDefinition<
    teletubby_pb.ReceiverStreamMessage,
    teletubby_pb.TelemetryStreamMessage
  >
  requestTelemetry: grpc.MethodDefinition<
    teletubby_pb.TelemetryRequest,
    teletubby_pb.TelemetryRequestAck
  >
  requestTelemetryQuery: grpc.MethodDefinition<
    teletubby_pb.TelemetryQueryRequest,
    teletubby_pb.TelemetryRequestAck
  >
}

export const TelemetryReceiverService: ITelemetryReceiverService

export interface ITelemetryReceiverServer
  extends grpc.UntypedServiceImplementation {
  registerStreamReceiver: grpc.handleBidiStreamingCall<
    teletubby_pb.ReceiverStreamMessage,
    teletubby_pb.TelemetryStreamMessage
  >
  requestTelemetry: grpc.handleUnaryCall<
    teletubby_pb.TelemetryRequest,
    teletubby_pb.TelemetryRequestAck
  >
  requestTelemetryQuery: grpc.handleUnaryCall<
    teletubby_pb.TelemetryQueryRequest,
    teletubby_pb.TelemetryRequestAck
  >
}

export class TelemetryReceiverClient extends grpc.Client {
  constructor(
    address: string,
    credentials: grpc.ChannelCredentials,
    options?: object
  )
  registerStreamReceiver(
    metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null
  ): grpc.ClientDuplexStream<
    teletubby_pb.ReceiverStreamMessage,
    teletubby_pb.TelemetryStreamMessage
  >
  registerStreamReceiver(
    metadata?: grpc.Metadata | null,
    options?: grpc.CallOptions | null
  ): grpc.ClientDuplexStream<
    teletubby_pb.ReceiverStreamMessage,
    teletubby_pb.TelemetryStreamMessage
  >
  requestTelemetry(
    argument: teletubby_pb.TelemetryRequest,
    callback: grpc.requestCallback<teletubby_pb.TelemetryRequestAck>
  ): grpc.ClientUnaryCall
  requestTelemetry(
    argument: teletubby_pb.TelemetryRequest,
    metadataOrOptions: grpc.Metadata | grpc.CallOptions | null,
    callback: grpc.requestCallback<teletubby_pb.TelemetryRequestAck>
  ): grpc.ClientUnaryCall
  requestTelemetry(
    argument: teletubby_pb.TelemetryRequest,
    metadata: grpc.Metadata | null,
    options: grpc.CallOptions | null,
    callback: grpc.requestCallback<teletubby_pb.TelemetryRequestAck>
  ): grpc.ClientUnaryCall
  requestTelemetryQuery(
    argument: teletubby_pb.TelemetryQueryRequest,
    callback: grpc.requestCallback<teletubby_pb.TelemetryRequestAck>
  ): grpc.ClientUnaryCall
  requestTelemetryQuery(
    argument: teletubby_pb.TelemetryQueryRequest,
    metadataOrOptions: grpc.Metadata | grpc.CallOptions | null,
    callback: grpc.requestCallback<teletubby_pb.TelemetryRequestAck>
  ): grpc.ClientUnaryCall
  requestTelemetryQuery(
    argument: teletubby_pb.TelemetryQueryRequest,
    metadata: grpc.Metadata | null,
    options: grpc.CallOptions | null,
    callback: grpc.requestCallback<teletubby_pb.TelemetryRequestAck>
  ): grpc.ClientUnaryCall
}
