import { TelemetryClient } from '../src'

const baseURL = 'https://api2.rocos.io'
const token = 'testTokenThatIJustMadeUp'

const projectId = 'front-end-challenge'
const callsigns = ['List']
const sources = ['test', 'test2']

const client = new TelemetryClient(baseURL, token)

const subscriber = client.subscribe(projectId, callsigns, sources)

try {
  subscriber.subject.subscribe(
    msg => console.log('msg', msg),
      err => console.log('err', err)
  )

  client.unsubscribe(subscriber)

  client.unsubscribeAll()
} catch (e) {
  console.log(e)
}
