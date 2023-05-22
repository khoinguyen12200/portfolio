# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY ../ .

RUN npm install -g serve@10.1.1

RUN npm run build


# Expose a port for the Node.js application to listen on
EXPOSE 3000

CMD [ "serve", "-s", "build" ]