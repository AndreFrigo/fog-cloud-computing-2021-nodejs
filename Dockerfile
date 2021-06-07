FROM node:13
WORKDIR /app
COPY app/package.json /app
RUN npm install
COPY app/. /app
CMD node index.js
EXPOSE 3000