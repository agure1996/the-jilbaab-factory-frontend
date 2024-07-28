# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port on which Vite runs
EXPOSE 5173

# Command to run Vite development server
CMD ["npm", "run", "dev"]
