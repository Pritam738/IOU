FROM node:lts-alpine
ENV NODE_ENV=production
ENV DOCKERIZE=true
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
RUN chmod +x env-scraper.sh
CMD ["sh", "env-scraper.sh"]