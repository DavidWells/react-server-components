const AWS = require('aws-sdk')
const forceSync = require('sync-rpc')
const syncFunction = forceSync(require.resolve('./_get-dynamo-data'))
const { MY_TABLE } = process.env
export default function App() {
  const data = syncFunction(MY_TABLE)
  console.log('data', data)
  return (
    <div className="main">
      Hello from App.server.js
      <pre>
      {JSON.stringify(data, null, 2)}
      </pre>
      {/* <Temp /> */}
    </div>
  );
}
