const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB({
  region: 'us-east-1'
})

async function doThing() {
  return (paramOne, paramTwo) => {
    // Your async code here
    return dynamoDB.scan({ TableName: 'todo-api-dev-todo-table' }).promise().then((x) => {
      return x
    })
  }
}

module.exports = doThing
