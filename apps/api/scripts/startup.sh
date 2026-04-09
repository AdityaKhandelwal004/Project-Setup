#!/bin/sh
set -e  
npm install

npm run db:migrate

npm start
