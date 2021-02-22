import { credentials, ServerCredentials, Server } from '@grpc/grpc-js'
import log from 'loglevel'
import { TelemetrySubscriber } from '../../src'
import { CallsignsLookup } from '../../src/client/Callsigns'
import { CustomTelemetryMessage } from '../../src'
import { TelemetryReceiverClient } from '../../src/grpc/teletubby_grpc_pb'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { mockServer } from '../utils/mockServer'
import { TelemetryMessage } from '../../src/grpc/teletubby_pb'
log.disableAll()

describe('TelemetrySubscriber test suite', () => {
  let testServer: Server
  let portNumber: number
  let telemetrySubscriber: TelemetrySubscriber

  beforeAll(async () => {
    testServer = mockServer()
    const createServer = () =>
      new Promise<void>(resolve => {
        testServer.bindAsync(
          'localhost:0',
          ServerCredentials.createInsecure(),
          (err: any, port: any) => {
            portNumber = port
            testServer.start()
            resolve()
          }
        )
      })
    await createServer()

    const callsignsLookup = new CallsignsLookup(['test'])
    const grpcClient = new TelemetryReceiverClient(
      `localhost:${portNumber}`,
      credentials.createInsecure()
    )
    telemetrySubscriber = new TelemetrySubscriber(
      'front-end-challenge',
      ['test'],
      callsignsLookup,
      'test',
      grpcClient
    )
  })

  afterAll(async () => {
    const shutdownServer = () =>
      new Promise<void>(resolve => {
        testServer.tryShutdown((error?: Error) => {
          resolve()
        })
      })
    await shutdownServer()
  })

  it('Create a new instance', () => {
    expect(telemetrySubscriber.subject).not.toBeNull()
  })

  it('should throw an error as the response message is invalid', async () => {
    const getError = () =>
      new Promise<any>(resolve => {
        telemetrySubscriber.subject.subscribe(
          msg => resolve(msg),
          err => resolve(err)
        )
      })
    const error = await getError()
    expect(error.message).toEqual('msg.getCallsign is not a function')
  })

  it('onData', async () => {
    const telMsg = new TelemetryMessage()
    telMsg.setCallsign('test')
    telMsg.setSource('/rocos/agent/telemetry/subscribed')
    telMsg.setCreated(1)
    const msg = new CustomTelemetryMessage(telMsg)
    msg.payload = {
      subscriberId: 'test123',
    }
    telemetrySubscriber.onData(msg)
    expect(telemetrySubscriber.subscriberId).toEqual('test123')
  })

  it('unsubscribe', async () => {
    // wait before unsubscribing
    telemetrySubscriber.unsubscribe()
    expect(telemetrySubscriber.activeCall).not.toBeNull()
  })
})
