# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.205.1/containers/ubuntu/.devcontainer/base.Dockerfile

# [Choice] Ubuntu version (use hirsuite or bionic on local arm64/Apple Silicon): hirsute, focal, bionic
ARG VARIANT="bionic"
FROM mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT}

# Additional required packages
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends autoconf bison build-essential libssl-dev libyaml-dev libreadline6-dev zlib1g-dev libncurses5-dev libffi-dev libgdbm5 libgdbm-dev

# Update git to 2.33.1 (works faster on larger repos)
RUN apt-get install -y software-properties-common \
    && apt-add-repository -y ppa:git-core/ppa \
    && apt-get update \
    && apt-get remove -y git-man \
    && apt-get install -y git-man=1:2.33.1-0ppa1~ubuntu18.04.1 \
    && apt-get install -y git

# Update .bashrc to remove git prompt (again for better speed)
COPY .bashrc /root/.

# Install rbenv
RUN apt-get -y install rbenv \
    && mkdir -p "$(rbenv root)"/plugins \
    && git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build

# Install Ruby 2.5.0 and Bundler 1.17.3
RUN rbenv install 2.5.0 \
    && eval "$(rbenv init -)" \
    && rbenv global 2.5.0 \
    && gem install bundler -v 1.17.3 \
    && rbenv rehash \
    && echo 'eval "$(rbenv init -)"' >> ~/.bashrc

# Install Node 14.17.1
RUN apt-get -y install nodejs npm \
    && npm install -g n \
    && n 14.17.1

# Install Yarn 1.22.5
RUN npm i -g yarn@1.22.5

# # Install ImageMagick
RUN apt-get -y install libmagickwand-dev imagemagick

# # Install MySQL Native Client
RUN apt-get -y install libsqlite3-dev libmysqlclient-dev mysql-client-core-5.7

# Expose port 3000 for web server
EXPOSE 3000


