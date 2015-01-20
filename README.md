#NodeJS & AngularJS Boilerplate

     server-side:
        - node.js
        - express & passport
        - mongodb

     client-side:
        - angular.js
        - bootstrap
        - LESS

     tests:
        - protractor e2e
        - karma unit tests
        - functional tests of REST interface with mocha

## How to use

Clone the repository, run `npm install` to grab the dependencies and start hacking!

### Running the app

Runs like a typical express app:

    node server.js

Development environment:

    grunt watch

### Running tests

#### e2e tests

install protractor

    npm install -g protractor

update webdrive-manager

    webdriver-manager update

start webdriver-manager

    webdriver-manager start

run tests 

    protractor tests/system/conf.js;        

#### unit tests

install karma

    npm install -g karma

run tests 

    karma start tests/unit/conf.js

#### functional tests

    mocha tests/functional