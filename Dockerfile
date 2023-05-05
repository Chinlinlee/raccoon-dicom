FROM eclipse-temurin:17-jdk-jammy

# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

ENV NODE_VERSION 16.20.0

# Installing Node
SHELL ["/bin/bash", "--login", "-i", "-c"]
RUN wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
RUN source /root/.bashrc && nvm install $NODE_VERSION
RUN n=$(which node);n=${n%/bin/node}; chmod -R 755 $n/bin/*; cp -r $n/{bin,lib,share} /usr/local
SHELL ["/bin/bash", "--login", "-c"]

# Installing imagemagick
RUN apt-get update -y && apt-get install -qq -y --no-install-recommends imagemagick

WORKDIR /
RUN mkdir -p /nodejs/raccoon/
WORKDIR /nodejs/raccoon/
# Bundle APP files
COPY package*.json /nodejs/raccoon/
COPY . /nodejs/raccoon/

# Move opencv libs to jdk's lib dir
RUN mv /nodejs/raccoon/models/DICOM/dcm4che/javaNode/dcm4chee/lib/linux-x86-64/*.so $JAVA_HOME/lib

# Install raccoon dependencies
ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV production
ENV DCMDICTPATH=/nodejs/raccoon/models/DICOM/dcmtk/dicom.dic
RUN npm install pm2@latest -g
RUN npm install -g npm
RUN npm install --unsafe-perm --only=production

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]