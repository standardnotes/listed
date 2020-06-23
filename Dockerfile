FROM ruby:2.6.5-slim-stretch

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

WORKDIR /listed

RUN apt-get update \
    && apt-get install -y git build-essential libmariadb-dev curl \
    && apt-get -y autoclean

RUN mkdir -p /usr/local/nvm
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 10.20.1
ENV NVM_INSTALL_PATH $NVM_DIR/versions/node/v$NODE_VERSION
ENV WEBPACKER_NODE_MODULES_BIN_PATH=value

RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

RUN source $NVM_DIR/nvm.sh \
   && nvm install $NODE_VERSION \
   && nvm alias default $NODE_VERSION \
   && nvm use default

ENV NODE_PATH $NVM_INSTALL_PATH/lib/node_modules
ENV PATH $NVM_INSTALL_PATH/bin:$PATH

RUN npm install -g yarn

COPY package.json package-lock.json Gemfile Gemfile.lock /listed/

COPY vendor /listed/vendor

RUN npm ci

RUN gem install bundler && bundle install

COPY . /listed

RUN bundle exec rake assets:precompile

EXPOSE 3000

ENTRYPOINT [ "docker/entrypoint.sh" ]

CMD [ "start" ]
