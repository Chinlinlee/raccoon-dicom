FROM keymetrics/pm2:latest-alpine

WORKDIR /
RUN mkdir -p /nodejs/app/
RUN chown -R node:node /nodejs
WORKDIR /nodejs/app/
# Bundle APP files
COPY --chown=node:node package*.json /nodejs/app/
COPY --chown=node:node . /nodejs/app/

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV production
RUN npm ci --only=production

# Show current folder structure in logs
#RUN ls -al -R
USER node
CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]