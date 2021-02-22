# rocos-node-sdk
NodeJS SDK for interacting with the Rocos platform.

## Getting Started
Use the latest stable release of the sdk which can be installed using npm.

`npm install rocos-node-sdk`

## Example usage

```typescript
import { TelemetryClient } from '../src'

const baseURL = 'https://api2.rocos.io'
const token = 'testTokenThatIJustMadeUp'

const projectId = 'testProjectId'
const callsigns = ['List']
const sources = ['test', 'test2']

const client = new TelemetryClient(baseURL, token)

const subscriber = client.subscribe(projectId, callsigns, sources)

try {
   subscriber.subject.subscribe(msg => {
      console.log('msg', msg)
   })

   client.unsubscribe(subscriber)

   client.unsubscribeAll()
} catch (e) {
   console.log(e)
}
```

## Dev Pre-requisites

1. Protocol buffer compiler (protoc)

   Download and installation guide can be found here: https://developers.google.com/protocol-buffers/docs/downloads

2. Node Version Manager

   Project currently runs on node 12.20.2. You'll need the Node Version Manager, installation instructions can be found here: https://github.com/nvm-sh/nvm

   Afterwards, run the commands below:
   `$ nvm use && nvm install`

   Check the node version matches the one in the nvm environment file ".nvmrc".
   `$ nvm which`

## Dev Getting Started

1. Clone the project
   `$ git clone https://github.com/matejdr/rocos-node-sdk.git`

2. Install node modules
   `$ yarn install`

3. Run protoc
   `$ ./resources/generate.stubs.sh`

4. Build the project
   `$ yarn build`

5. Generate documentation
   `$ yarn docs`
