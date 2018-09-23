FROM node:alpine

RUN mkdir www/
WORKDIR www/

# Copy and install dependencies
COPY package.json yarn.lock* ./
RUN yarn install

# Compile/Run
COPY src/ src/
COPY .babelrc .
RUN yarn build

EXPOSE 3030

ENV NODE_ENV=production
CMD yarn serve
