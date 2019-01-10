#!/usr/bin/env bash

# script is for local iteration on running the circle tests inside a docker container outside of circle.
# Start a docker container with a mounted volume with something like:
# docker run -it -v $(pwd)/docker_mount:/home/circleci/docker_mount wjordan/code-dot-org:0.5 bash
# Get the code-dot-org repo into the container, either by cloning, or via the mounted directory.
# Copy this script into the root of the code-dot-org directory, cd into that directory, check out a feature branch, and run this script.

set -xe

export CI=true
export RAILS_ENV=test
export RACK_ENV=test
export DISABLE_SPRING=1
export LD_LIBRARY_PATH=/usr/local/lib
export CIRCLE_BUILD_NUM=$RANDOM$RANDOM
export CIRCLE_NODE_INDEX=1
export CIRCLE_TEST_REPORTS=/home/circleci/test_reports
export CIRCLE_ARTIFACTS=/home/circleci/artifacts

# TODO: recreate git checkout logic more accurately; UI test seeding relies on git state being correct

# name: taking these out of dockerfile to see if that fixes build issues
sudo mv /usr/bin/parallel /usr/bin/gnu_parallel
sudo apt-get update
sudo apt-get install -y libicu-dev enscript moreutils pdftk libmysqlclient-dev libsqlite3-dev
wget https://github.com/htacg/tidy-html5/releases/download/5.4.0/tidy-5.4.0-64bit.deb && sudo dpkg -i tidy-5.4.0-64bit.deb
sudo mv /usr/bin/gnu_parallel /usr/bin/parallel

# start mysql
sudo service mysql start && mysql -V

# name: install dependencies
bundle check --path=/home/circleci/project/vendor/bundle || bundle install --deployment --path=/home/circleci/project/vendor/bundle --jobs=4 --retry=3 --without ''

# name: set yarn version
sudo apt-get install yarn=1.6.0-1

# set up locals.yml
# Need to actually write all the commented out lines also
echo "
bundler_use_sudo: false
properties_encryption_key: $PROPERTIES_ENCRYPTION_KEY
applitools_eyes_api_key: $APPLITOOLS_KEY
cloudfront_key_pair_id: $CLOUDFRONT_KEY_PAIR_ID
cloudfront_private_key: \"$CLOUDFRONT_PRIVATE_KEY\"
saucelabs_username: $SAUCE_USERNAME
saucelabs_authkey: $SAUCE_ACCESS_KEY
ignore_eyes_mismatches: true
disable_all_eyes_running: true
firebase_name: $FIREBASE_NAME
firebase_secret: $FIREBASE_SECRET
use_my_apps: true
use_my_shared_js: true
build_blockly_core: true
build_shared_js: true
build_dashboard: true
build_pegasus: true
build_apps: true
localize_apps: true
dashboard_enable_pegasus: true
dashboard_workers: 5
skip_seed_all: true
" >> locals.yml

# name: rake install
RAKE_VERBOSE=true mispipe "bundle exec rake install" "ts '[%Y-%m-%d %H:%M:%S]'"

# name: rake build
RAKE_VERBOSE=true mispipe "bundle exec rake build --trace" "ts '[%Y-%m-%d %H:%M:%S]'"

# apply test settings for after unit tests
echo "
no_https_store: true
override_dashboard: \"localhost-studio.code.org\"
override_pegasus: \"localhost.code.org\"
dashboard_port: 3000
pegasus_port: 3000
animations_s3_directory: animations_circle/$CIRCLE_BUILD_NUM
assets_s3_directory: assets_circle/$CIRCLE_BUILD_NUM
files_s3_directory: files_circle/$CIRCLE_BUILD_NUM
sources_s3_directory: sources_circle/$CIRCLE_BUILD_NUM
" >> locals.yml

# name: seed ui tests
bundle exec rake circle:seed_ui_test

# name: run ui tests
bundle exec rake circle:run_ui_tests --trace
