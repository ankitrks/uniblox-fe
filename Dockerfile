# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory to /ecommerce_frontend
WORKDIR /ecommerce_frontend

# Copy package.json and package-lock.json to /ecommerce_frontend
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV REACT_APP_API_URL=http://backend:8000/api

# Run npm start when the container launches
CMD ["npm", "start"]
