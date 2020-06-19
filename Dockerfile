FROM ruby:2.6.5-alpine

RUN apk add --update --no-cache \
    alpine-sdk \
    mariadb-dev \
    git \
    nodejs \
    nodejs-npm \
    tzdata

WORKDIR /listed

COPY package.json package-lock.json Gemfile Gemfile.lock /listed/

COPY vendor /listed/vendor

RUN npm ci

RUN gem install bundler && bundle install

COPY . /listed

RUN bundle exec rake assets:precompile

EXPOSE 3000

ENTRYPOINT [ "docker/entrypoint.sh" ]

CMD [ "start" ]
