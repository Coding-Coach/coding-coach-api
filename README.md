# Coding-Coach-api
[![Build Status](https://api.travis-ci.org/Coding-Coach/coding-coach-api.svg?branch=development)](https://travis-ci.org/Coding-Coach/coding-coach-api)

## Getting Started
The server can be run in two different modes: `development` and `production`

## Development
To run the server in `development`:
1. `yarn install` - This will install the node dependencies
2. `yarn start` - This will start the server

The server runs in watch mode so changes you make to the API will automatically restart the server
with those changes.

GraphQL Playground at : http://localhost:3000/graphql
Dummy Endpoint : http://localhost:3000/hello

> Note that this does not start a MongoDB database, ensure an instance is running at `localhost:27017`.

## Production
To run the server in `production`, you will need `Docker`.
If you don't have Docker installed:
* Mac users: https://docs.docker.com/docker-for-mac/install/
* Windows users: https://docs.docker.com/docker-for-windows/

To run the server:
1. `docker-compose up -d`
2. The server will be running at `http://localhost:3030/`

> Note that using `docker-compose up` will also start a MongoDB container.

## Build
To build the API project and create the `production` version in the `dist` folder, run:
```
yarn build
```

## Build docker image
To build the docker image for the API project, run:
```
yarn build:docker
```

If you want to start a container based on this image, run:
```
docker run -p 3000:80 coding-coach
```

## Tests
To write and run tests against the development server:
1. `yarn start:test` - This will start the server against a test database
2. `yarn test` OR `yarn test --watch`

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

Please Note that before you run the command:
```
$ git pull upstream development
```
you need to have ssh-key setup and added to your github account.

If you are yet to setup ssh-key visit the link below:

* https://help.github.com/articles/connecting-to-github-with-ssh/

### PRs
In order to merge a PR, there should be a couple of approval reviews. Once is approved, we should merge to the development branch using the Squash button in github.

When using squash, all the commits will be squashed into one. The idea is to merge features/fixes as oppose of merging each individual commit. This helps when looking back in time for changes in the code base, and if the PR has a great comment, it's easier to know why that code was introduced.
