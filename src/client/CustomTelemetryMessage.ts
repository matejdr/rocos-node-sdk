import { TelemetryMessage } from '../grpc/teletubby_pb'

export class CustomTelemetryMessage {
  callsign: string
  source: string
  createdAt: number
  payload: any
  type: string
  receivedAt: Date
  projectId: string | undefined
  constructor(msg: TelemetryMessage) {
    this.callsign = msg.getCallsign()
    this.source = msg.getSource()
    this.type = 'json'
    this.payload = JSON.parse(msg.getPayload_asB64())
    this.createdAt = msg.getCreated()
    this.receivedAt = new Date()
  }
}
