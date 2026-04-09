FROM node:23.11.0-alpine
RUN npm install pm2 -g
# Working Dir
RUN mkdir -p /Obiemoney-API
WORKDIR /Obiemoney-API
# Copy Package Json Files
COPY package*.json /Obiemoney-API/
# Copy .env File
# COPY .env /Obiemoney-API/
RUN mkdir uploads
# Install Files
RUN npm ci
# Copy Source Files
COPY . /Obiemoney-API/
# Build
RUN npm run build
CMD [ "npm", "run", "serve:prod" ]