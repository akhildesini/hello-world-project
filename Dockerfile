
# Stage 1: Use a secure and lightweight official Node.js image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy both package.json AND package-lock.json
COPY package*.json ./

# Install dependencies using npm ci for faster, more reliable builds
# This will now work because package-lock.json exists
RUN npm ci --omit=dev

# Copy the rest of the application source code into the image
COPY . .

# Expose port 8080 to allow external connections
EXPOSE 8080

# Run the application as a non-root user for enhanced security
USER node

# The command to run when the container starts.
CMD [ "npm", "start" ]
