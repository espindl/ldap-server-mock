FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3004
CMD [ "node", "server.js", "--conf=tmp/ldap-server-mock-conf.json", "--database=tmp/users.json" ]