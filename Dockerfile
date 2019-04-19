FROM node:lts
RUN apt-get update
RUN apt-get install dos2unix
RUN yarn global add azurite
RUN dos2unix /usr/local/share/.config/yarn/global/node_modules/azurite/bin/azurite
ENTRYPOINT azurite