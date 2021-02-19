import { TelemetryClient } from '../src'

const baseURL = 'https://api2.rocos.io'
const token = 'testTokenThatIJustMadeUp'

const projectId = 'testProjectId'
const callsigns = ['List']
const sources = ['test', 'test2']

const client = new TelemetryClient(baseURL, token)

const subscriber = client.subscribe(projectId, callsigns, sources)

if (subscriber) {
  subscriber.subject.subscribe(msg => {
    console.log('msg', msg)
  })

  client.unsubscribe(subscriber)

  client.unsubscribeAll()
}
