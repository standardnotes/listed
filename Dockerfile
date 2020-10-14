FROM ruby:2.6.5-slim-stretch

ARG UID=1000
ARG GID=1000

RUN addgroup -S listed -g $GID && adduser -D -S listed -G listed -u $UID

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

WORKDIR /listed

RUN chown -R $UID:$GID .

USER listed

RUN apt-get update \
    && apt-get install -y git build-essential libmariadb-dev curl imagemagick \
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

COPY --chown=$UID:$GID package.json yarn.lock Gemfile Gemfile.lock /listed/

COPY --chown=$UID:$GID vendor /listed/vendor

RUN yarn install --frozen-lockfile

RUN gem install bundler && bundle install

COPY --chown=$UID:$GID . /listed

RUN bundle exec rake assets:precompile

EXPOSE 3000

ENTRYPOINT [ "docker/entrypoint.sh" ]

CMD [ "start" ]
