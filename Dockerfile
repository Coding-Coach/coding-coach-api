FROM node:alpine

RUN mkdir www/
WORKDIR www/
ADD dist/ .
COPY package.json .
RUN yarn install --production

EXPOSE 80
EXPOSE 3030

ENV NODE_ENV=production
CMD yarn serve