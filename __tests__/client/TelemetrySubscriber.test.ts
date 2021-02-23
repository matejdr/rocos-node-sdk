import { credentials } from '@grpc/grpc-js'
import { Subscription } from 'rxjs'
import log from 'loglevel'
import { PassThrough } from 'stream'
import { TelemetrySubscriber } from '../../src'
import { CallsignsLookup } from '../../src/client/Callsigns'
import { TelemetryReceiverClient } from '../../src/grpc/teletubby_grpc_pb'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TelemetryMessage } from '../../src/grpc/teletubby_pb'
log.disableAll()

describe('TelemetrySubscriber test suite', () => {
  let portNumber: number
  let telemetrySubscriber: TelemetrySubscriber

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  PassThrough.prototype.cancel = jest.fn().mockImplementationOnce(() => null)
  const mockedStream = new PassThrough()
  let subscriber: Subscription
  let returnMessage: any
  let returnError: any

  mockedStream.on('data', d => {
    // console.dir('data', d);
  })

  mockedStream.on('end', () => {
    // console.dir('goodbye');
  })

  beforeAll(async () => {
    const callsignsLookup = new CallsignsLookup(['test'])
    const grpcClient = new TelemetryReceiverClient(
      `localhost:${portNumber}`,
      credentials.createInsecure()
    )
    jest
      .spyOn(grpcClient, 'registerStreamReceiver')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .mockImplementation(() => mockedStream)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(grpcClient, 'requestTelemetry').mockImplementation(() => null)
    jest
      .spyOn(grpcClient, 'requestTelemetryQuery')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .mockImplementation(() => null)

    telemetrySubscriber = new TelemetrySubscriber(
      'front-end-challenge',
      ['/rocos/agent/telemetry/subscribed'],
      callsignsLookup,
      'test',
      grpcClient
    )

    subscriber = telemetrySubscriber.subject.subscribe(
      msg => (returnMessage = msg),
      err => (returnError = err)
    )
  })

  afterAll(async () => {
    if (subscriber) {
      subscriber.unsubscribe()
    }
    mockedStream.destroy()
  })

  it('Create a new instance', () => {
    expect(telemetrySubscriber.subject).not.toBeNull()
  })

  it('should return the response message', async () => {
    const telMsg = new TelemetryMessage()
    telMsg.setCallsign('test')
    telMsg.setSource('/rocos/agent/telemetry/subscribed')
    telMsg.setCreated(1)
    telMsg.setPayload(JSON.stringify({ subscriberId: 'test123' }))
    mockedStream.emit('data', telMsg)
    expect(returnMessage.source).toEqual('/rocos/agent/telemetry/subscribed')
  })

  it('should throw an error from service', async () => {
    mockedStream.emit('error', 'test error')
    expect(returnError.message).toEqual('test error')
  })

  it('unsubscribe', async () => {
    // wait before unsubscribing
    telemetrySubscriber.unsubscribe()
    expect(telemetrySubscriber.activeCall).not.toBeNull()
  })
})
