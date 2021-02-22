const PROTO_PATH = __dirname + '/../../resources/teletubby.proto'

const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})
const teletubby = grpc.loadPackageDefinition(packageDefinition).teletubby.v1

function registerStreamReceiver(call: any) {
  call.write('test')
}
function requestTelemetry(call: any) {
  // console.log('call', call)
}
function requestTelemetryQuery(call: any) {
  // console.log('call', call)
}

export const mockServer = () => {
  const server = new grpc.Server()
  server.addService(teletubby.TelemetryReceiver.service, {
    RegisterStreamReceiver: registerStreamReceiver,
    RequestTelemetry: requestTelemetry,
    RequestTelemetryQuery: requestTelemetryQuery,
  })
  return server
}

export const sleep = (duration: number) =>
  new Promise<void>(resolve => setTimeout(() => resolve(), duration))
