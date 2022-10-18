# Use latest version of node
FROM node:latest

# Use latest version of npm
RUN npm install npm@latest -g

COPY package.json package-lock.json* ./

RUN npm install --no-optional && npm cache clean --force

# copy in our source code last, as it changes the most
WORKDIR /xandria

COPY . .

EXPOSE 4000

CMD [ "npm", "run", "start"]