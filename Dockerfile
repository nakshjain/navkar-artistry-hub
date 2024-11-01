FROM node:latest AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN npm install -g @angular/cli

COPY . .

RUN npm install

RUN npm run build

FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/navkar-artistry-hub /usr/share/nginx/html

EXPOSE 80

#CMD ["nginx", "-g", "daemon off;"]
