# Base image
FROM node:latest

# Create app directory
WORKDIR /usr/consumer/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./

# Install app dependencies
RUN npm install --force


# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npx prisma generate
RUN npm run build

EXPOSE 80
# Start the server using the production build
CMD [ "npm", "start" ]