FROM node:23-alpine

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

#Install dependencies
RUN npm install

# Copy app source code
COPY . .

#Expose port and start application
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
