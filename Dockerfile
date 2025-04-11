FROM node:18-alpine

# Create and set working directory
WORKDIR /app

COPY ./src/package*.json ./

# Install dependencies
RUN npm install

# Copy all other source files
COPY src .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]