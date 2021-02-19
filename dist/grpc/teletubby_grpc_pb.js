// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var teletubby_pb = require('./teletubby_pb.js');

function serialize_teletubby_v1_ReceiverStreamMessage(arg) {
  if (!(arg instanceof teletubby_pb.ReceiverStreamMessage)) {
    throw new Error('Expected argument of type teletubby.v1.ReceiverStreamMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teletubby_v1_ReceiverStreamMessage(buffer_arg) {
  return teletubby_pb.ReceiverStreamMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teletubby_v1_TelemetryQueryRequest(arg) {
  if (!(arg instanceof teletubby_pb.TelemetryQueryRequest)) {
    throw new Error('Expected argument of type teletubby.v1.TelemetryQueryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teletubby_v1_TelemetryQueryRequest(buffer_arg) {
  return teletubby_pb.TelemetryQueryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teletubby_v1_TelemetryRequest(arg) {
  if (!(arg instanceof teletubby_pb.TelemetryRequest)) {
    throw new Error('Expected argument of type teletubby.v1.TelemetryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teletubby_v1_TelemetryRequest(buffer_arg) {
  return teletubby_pb.TelemetryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teletubby_v1_TelemetryRequestAck(arg) {
  if (!(arg instanceof teletubby_pb.TelemetryRequestAck)) {
    throw new Error('Expected argument of type teletubby.v1.TelemetryRequestAck');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teletubby_v1_TelemetryRequestAck(buffer_arg) {
  return teletubby_pb.TelemetryRequestAck.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teletubby_v1_TelemetryStreamMessage(arg) {
  if (!(arg instanceof teletubby_pb.TelemetryStreamMessage)) {
    throw new Error('Expected argument of type teletubby.v1.TelemetryStreamMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teletubby_v1_TelemetryStreamMessage(buffer_arg) {
  return teletubby_pb.TelemetryStreamMessage.deserializeBinary(new Uint8Array(buffer_arg));
}


var TelemetryReceiverService = exports.TelemetryReceiverService = {
  // Register the receiver supports bidirectional streaming. Receiver side telemetry ack is supported under bidrectional stream now
registerStreamReceiver: {
    path: '/teletubby.v1.TelemetryReceiver/RegisterStreamReceiver',
    requestStream: true,
    responseStream: true,
    requestType: teletubby_pb.ReceiverStreamMessage,
    responseType: teletubby_pb.TelemetryStreamMessage,
    requestSerialize: serialize_teletubby_v1_ReceiverStreamMessage,
    requestDeserialize: deserialize_teletubby_v1_ReceiverStreamMessage,
    responseSerialize: serialize_teletubby_v1_TelemetryStreamMessage,
    responseDeserialize: deserialize_teletubby_v1_TelemetryStreamMessage,
  },
  requestTelemetry: {
    path: '/teletubby.v1.TelemetryReceiver/RequestTelemetry',
    requestStream: false,
    responseStream: false,
    requestType: teletubby_pb.TelemetryRequest,
    responseType: teletubby_pb.TelemetryRequestAck,
    requestSerialize: serialize_teletubby_v1_TelemetryRequest,
    requestDeserialize: deserialize_teletubby_v1_TelemetryRequest,
    responseSerialize: serialize_teletubby_v1_TelemetryRequestAck,
    responseDeserialize: deserialize_teletubby_v1_TelemetryRequestAck,
  },
  // Through telemetry query, user can specify the query of the callsign with the predicates. The subscriber can subscribe to telemetry sources from dynamic callsigns.
// Multiple calls to RequestTelemetryQuery with same subscribe ID will overwrite the query from previous requests.
requestTelemetryQuery: {
    path: '/teletubby.v1.TelemetryReceiver/RequestTelemetryQuery',
    requestStream: false,
    responseStream: false,
    requestType: teletubby_pb.TelemetryQueryRequest,
    responseType: teletubby_pb.TelemetryRequestAck,
    requestSerialize: serialize_teletubby_v1_TelemetryQueryRequest,
    requestDeserialize: deserialize_teletubby_v1_TelemetryQueryRequest,
    responseSerialize: serialize_teletubby_v1_TelemetryRequestAck,
    responseDeserialize: deserialize_teletubby_v1_TelemetryRequestAck,
  },
};

exports.TelemetryReceiverClient = grpc.makeGenericClientConstructor(TelemetryReceiverService);
