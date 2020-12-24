# React Server Components rendering in AWS Lambda

Example of React server components running in AWS lambda.

Fork of https://github.com/sw-yx/amplify-react-serverless-components/.

Credit goes to [Swyx](https://twitter.com/swyx) for putting this together.

## Install

```
npm install
```

Also install serverless if you dont have it

```
npm i serverless -g
```

## Build

```
npm run build
```

## Deployment

```
serverless deploy
```

## See it in action

```
serverless info
```

Visit your live URL `https://xxxxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/rsc/`

## Todo

- [ ] Make a real dynamoDB adapter. [Example postGres](https://github.com/facebook/react/tree/master/packages/react-pg)
