const AWS = require('aws-sdk')
const forceSync = require('sync-rpc')
const syncGetDataFromDb = forceSync(require.resolve('./_get-dynamo-data'))

export default function App() {
  const data = syncGetDataFromDb(process.env.MY_TABLE)
  console.log('data', data)
  return (
    <div className="main">
      <h1>React Server Components Rendering from AWS Lambda</h1>
      <div>
        <h3>Data streamed from server</h3>
        <p>Check network tab</p>
        <pre>
        {JSON.stringify(data, null, 2)}
        </pre>
      </div>
      {/* <Temp /> */}
    </div>
  )
}
