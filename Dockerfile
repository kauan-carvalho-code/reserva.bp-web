FROM node:lts-alpine

WORKDIR /app

COPY package.json package-lock.* ./

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]