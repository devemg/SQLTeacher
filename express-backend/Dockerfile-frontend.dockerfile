FROM node
WORKDIR /usr/src/app 
COPY . .
RUN npm install
RUN npm run all
EXPOSE 3000