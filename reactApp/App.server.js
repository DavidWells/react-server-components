const AWS = require('aws-sdk')
const forceSync = require('sync-rpc')
const syncFunction = forceSync(require.resolve('./_get-dynamo-data'))

export default function App() {
  const data = syncFunction()
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
