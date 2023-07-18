FROM node:18-alpine3.17

WORKDIR /app

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 7373

CMD ["npm", "run", "dev"]