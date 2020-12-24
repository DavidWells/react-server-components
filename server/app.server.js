const register = require('react-server-dom-webpack/node-register')
register()

const babelRegister = require('@babel/register')
babelRegister({
  ignore: [/\/(build|server|node_modules)\//],
  presets: [['react-app', {runtime: 'automatic'}]],
  plugins: ['@babel/transform-modules-commonjs'],
  cache: true,
})

const express = require('express')
// const compress = require('compression');
const { readFileSync, readFile } = require('fs')
const { promisify } = require('util')
const { pipeToNodeWritable } = require('react-server-dom-webpack/writer')
const path = require('path')
const React = require('react')
const ReactApp = require('../reactApp/App.server').default

const read = promisify(readFile)

const PORT = 3000
const app = express()
// modify this based on how you set up your api route
const functionPath = '/rsc'

// app.use(compress());
app.use(express.json())
// // maybe to try later
// var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
// app.use(bodyParser.json())
// app.use(awsServerlessExpressMiddleware.eventContext())

function handleErrors(fn) {
  console.log('handleErrors called')
  return async function(req, res, next) {
    try {
      return await fn(req, res)
    } catch (x) {
      next(x)
    }
  }
}

app.get(
  functionPath + '/',
  handleErrors(async function(_req, res) {
    await waitForWebpack();
    console.log('reading file.....')
    const html = readFileSync(path.resolve(__dirname, '../build/index.html'), 'utf8')
    console.log('serving file.....')
    // Note: this is sending an empty HTML shell, like a client-side-only app.
    // However, the intended solution (which isn't built out yet) is to read
    // from the Server endpoint and turn its response into an HTML stream.
    res.send(html)
  })
)


async function renderReactTree(res, props) {
  await waitForWebpack();
  const manifest = await read(path.resolve(__dirname, '../build/react-client-manifest.json'), 'utf8')
  const moduleMap = JSON.parse(manifest)
  pipeToNodeWritable(React.createElement(ReactApp, props), res, moduleMap)
}

function sendResponse(req, res, redirectToId) {
  const location = JSON.parse(req.query.location);
  if (redirectToId) {
    location.selectedId = redirectToId
  }
  // https://stackoverflow.com/questions/44815649/aws-api-gateway-err-content-decoding-failed-in-browser
  // otherwise we get ERR_CONTENT_DECODING_FAILED 200
  res.set('Accept-Encoding', 'identity');
  res.set('X-Location', JSON.stringify(location));
  renderReactTree(res, { })
}

app.get(functionPath + '/react', function(req, res) {
  sendResponse(req, res, null)
})

// VIRTUAL
app.use(functionPath, express.static('build'));
app.use(functionPath, express.static('public'));

app.on('error', function(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
})

async function waitForWebpack() {
  while (true) {
    try {
      readFileSync(path.resolve(__dirname, '../build/index.html'));
      return;
    } catch (err) {
      console.log('Could not find webpack build output. Will retry in a second...');
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }
}

app.listen(PORT, function() {
  console.log("App started")
})

module.exports = app
