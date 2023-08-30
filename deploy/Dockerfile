# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./
COPY . .

#install typescript tsc
RUN npm install -g typescript react-script

# Expose a port for the Node.js application to listen on
EXPOSE 80

# Run the Node.js application
# Run yarn build and yarn start
CMD yarn && PORT=80 yarn start
