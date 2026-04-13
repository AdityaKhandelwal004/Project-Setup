FROM node:23.11.0-alpine
RUN npm install pm2 -g
# Working Dir
RUN mkdir -p /API
WORKDIR /API
# Copy Package Json Files
COPY package*.json /API/
# Copy .env File
# COPY .env /API/
RUN mkdir uploads
# Install Files
RUN npm ci
# Copy Source Files
COPY . /API/
# Build
RUN npm run build
CMD [ "npm", "run", "serve:prod" ]