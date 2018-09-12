# Coding-Coach-back-end

### Setup
Execute the following to get the server running at `http://localhost:3000`
```
npm install
npm run start
```

GraphQL Playground at : http://localhost:3000/graphql
Dummy Endpoint : http://localhost:3000/hello

### Build and Docker

The following command will create the `production` version code in the `dist` folder and create a docker image `coding-coach`
```
npm run build
```

You can launch the docker image with

```
npm run run-docker

OR

docker run -p 3000:80 coding-coach
```

The application, when built and run with docker, runs with `NODE_ENV` set to `production` on http://localhost:3000

