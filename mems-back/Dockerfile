FROM node:13.10.1-buster

EXPOSE 8080
WORKDIR /mems

COPY package.json /mems
RUN npm install

COPY . /mems

CMD ["npm", "start"]
