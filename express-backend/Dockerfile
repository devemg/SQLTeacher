FROM node
WORKDIR /usr/src/app 
COPY . .
RUN npm i -g jison
RUN npm install
RUN npm run build
RUN npm run compile
EXPOSE 3000
ENTRYPOINT ["npm", "start"]