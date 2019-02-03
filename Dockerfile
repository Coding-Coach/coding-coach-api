# Create the builder image using 10.12.0-alpine
FROM node:10.12.0-alpine AS builder

# Define working directory to build the sources
RUN mkdir www/
WORKDIR www/

# Copy every file in the project to the builder image
COPY . .

# Install dependencies, devDependencies and build the application
RUN yarn install
RUN yarn build

# Create the release image using 10.12.0-alpine
FROM node:10.12.0-alpine

# Define working directory to host the distributables
RUN mkdir www/
WORKDIR www/

# Copy both the package.json and yarn.lock file to the release image
COPY package.json yarn.lock* ./
# Install dependencies (exclude devDependencies)
RUN yarn install --production=true

# Copy the dist folder from the builder image to the release image
COPY --from=builder /www/dist ./dist

# Expose port 3030
EXPOSE 80

# Set the node_environment to production
ENV NODE_ENV=production

# Serve the application using node
CMD yarn serve
