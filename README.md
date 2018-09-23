# Coding-Coach-api

## Getting Started
The server can be run in two different modes: `development` and `production`

## Development
To run the server in `development`:
1. `yarn install` - This will install the node dependencies
2. `yarn start` - This will start the server

The server runs in watch mode so changes you make to the API will automatically restart the server
with those changes.

To write and run tests against the development server:
1. `yarn start:test` - This will start the server against a test database
2. `yarn test` OR `yarn test --watch`

## Production
To run the server in `production`, you will need `Docker`.
If you don't have Docker installed:
* Mac users: https://docs.docker.com/docker-for-mac/install/
* Windows users: https://docs.docker.com/docker-for-windows/

To run the server:
1. `docker-compose up -d`
2. The server will be running at `http://localhost:3030/

## Setup
Execute the following to get the server running at `http://localhost:3000`
```
npm install
npm run start
```

GraphQL Playground at : http://localhost:3000/graphql
Dummy Endpoint : http://localhost:3000/hello

## Build and Docker

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

## Coding Coach Board
In order to organize all the work, we are using https://zenhub.com to keep track of all the epics and tasks. After you login to ZenHub search for the Coding-Coach/coding-coach repository, make sure you don't add someone else fork.

## Workflow
This section describes the workflow we are going to follow when working in a new feature or fixing a bug. If you want to contribute, please follow these steps:

### Fork this project
Clone the forked project to your local environment, for example:
`git clone git@github.com:YOUR_GITHUB_USERNAME/coding-coach-api.git` (Make sure to replace the URL to your own repository).
Add the original project as a remote, for this example the name is upstream, feel free to use whatever name you want.
`git remote add upstream git@github.com:Coding-Coach/coding-coach-api.git`.
Forking the project will create a copy of that project in your own GitHub account, you will commit your work against your own repository.

### Update your local copy
In order to update your local environment to the latest version on development, you will have to pull the changes using the upstream repository, for example: git pull upstream development. This will pull all the new commits from the origin repository to your local environment.

### Features/Bugs/Chores
When working on a new feature, create a new branch feature/something from the development branch, for example `feature/login-form`. Commit your work against this new branch and push everything to your forked project. Once everything is completed, you should create a PR to the original project. Make sure to add a description about your work and a link to the trello task.

When fixing a bug, create a new branch fix/something from the development branch, for example `fix/css-btn-issues`. When completed, push your commits to your forked repository and create a PR from there. Please make sure to describe what was the problem and how did you fix it.

When working on a chore (documentation updates, tech debt clean-up, etc), prefix your branch with `chore` ex. `chore/add-new-plugin`

### Updating your local branch
Let's say you've been working on a feature for a couple days, most likely there are new changes in development and your branch is behind. In order to update it to the latest (You might not need/want to do this) you need to pull the latest changes to develop and then rebase your current branch.
```
$ git checkout development
$ git pull upstream development
$ git checkout feature/something-awesome
$ git rebase development
```
After this, your commits will be on top of the development commits. From here you can push to your origin repository and create a PR.

You might have some conflicts while rebasing, try to resolve the conflicts for each individual commit. Rebasing is intimidating at the begining, if you need help don't be afraid to reach out in slack.

### PRs
In order to merge a PR, there should be a couple of approval reviews. Once is approved, we should merge to the development branch using the Squash button in github.

When using squash, all the commits will be squashed into one. The idea is to merge features/fixes as oppose of merging each individual commit. This helps when looking back in time for changes in the code base, and if the PR has a great comment, it's easier to know why that code was introduced.
