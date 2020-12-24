const awsServerlessExpress = require('aws-serverless-express');
const app = require('./server/app.server');

const server = awsServerlessExpress.createServer(app);

module.exports.app = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
