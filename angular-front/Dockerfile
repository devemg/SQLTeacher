FROM node:latest as build
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
CMD ["npm", "run" , "build", "--prod"]

# carpeta output /usr/src/app/dist/angular-front

FROM nginx 
COPY --from=build /usr/src/app/dist/angular-front /usr/share/nginx/html
EXPOSE 80
