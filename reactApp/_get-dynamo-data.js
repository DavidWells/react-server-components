const AWS = require('aws-sdk')
const { MY_TABLE } = process.env
const dynamoDB = new AWS.DynamoDB({
  region: 'us-east-1'
})

async function doThing() {
  return (tableName, paramTwo) => {
    if (!MY_TABLE) {
      return [{ info: 'MY_TABLE undefined '}]
    }
    if (!tableName) {
      return [{ info: 'tableName undefined '}]
    }
    const name = tableName || MY_TABLE
    // Your async code here
    return dynamoDB.describeTable({ TableName: MY_TABLE }).promise().then((x) => {
      return x
    })
  }
}

module.exports = doThing
