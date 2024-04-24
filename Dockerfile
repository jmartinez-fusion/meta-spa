FROM node:18-alpine as build

WORKDIR /app

RUN npm cache clean --force

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

RUN sed -i 's/<port>/80/g' /etc/nginx/nginx.conf
RUN sed -i 's/<url>/example.com/g' /etc/nginx/nginx.conf
RUN sed -i 's|<DIR>|/usr/share/nginx/html|g' /etc/nginx/nginx.conf

RUN chmod -R 777 /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

