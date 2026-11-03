mmo-cr-ios-tests

WDIO + Appium tests for the native iOS app, run on BrowserStack real devices.

- [Local](#local-development)
    - [Requirements](#requirements)
        - [Node.js](#nodejs)
    - [Setup](#setup)
    - [Running the tests](#running-the-tests)
- [Production](#production)
- [Licence](#licence)
    - [About the licence](#about-the-licence)

## Local Development

### Requirements

#### Node.js

Please install [Node.js](http://nodejs.org/) `>= v20` and [npm](https://nodejs.org/) `>= v9`. You will find it
easier to use the Node Version Manager [nvm](https://github.com/creationix/nvm)

To use the correct version of Node.js for this application, via nvm:

```bash
nvm use
```

### Setup

Install application dependencies:

```bash
npm install
```

### Running the tests

Specs live in `test/ios/specs/**/*.spec.ts`. Configs live in `config/`, sharing `config/wdio.base.conf.ts`. Variables can be set in your shell or in `.env`.

#### Local simulator/device (Appium)

Requires Xcode and Appium with the XCUITest driver (`npm i -g appium && appium driver install xcuitest`). Place the `.ipa`/`.app` in `./app`, then:

```bash
npm run test:ios
npm run test:ios:spec ./test/specs/<file>.ts
```

Optional: `IOS_DEVICE_NAME`, `IOS_PLATFORM_VERSION`, `IOS_UDID`, `IOS_BUNDLE_ID` (uninstalls the app first on a simulator), `APPIUM_NO_RESET`, `APPIUM_PORT`.

#### BrowserStack

```bash
npm run test:ios:browserstack
npm run test:ios:browserstack:spec ./test/specs/<file>.ts
```

Requires `BROWSERSTACK_USERNAME`, `BROWSERSTACK_ACCESS_KEY` and `BROWSERSTACK_IOS_APP_URL` (the `bs://...` URL of an app already uploaded to BrowserStack). Optional: `BROWSERSTACK_MAX_INSTANCES` (default 2, must not exceed the plan's parallel sessions).

## Production

### Running the tests

Tests are run from the CDP-Portal under the Test Suites section. Before any changes can be run, a new docker image must be built, this will happen automatically when a pull request is merged into the `main` branch.
You can check the progress of the build under the actions section of this repository. Builds typically take around 1-2 minutes.

The results of the test run are made available in the portal.

## Requirements of CDP Environment Tests

1. Your service builds as a docker container using the `.github/workflows/publish.yml`
   The workflow tags the docker images allowing the CDP Portal to identify how the container should be run on the platform.
   It also ensures its published to the correct docker repository.

2. The Dockerfile's entrypoint script should return exit code of 0 if the test suite passes or 1/>0 if it fails

3. Test reports should be published to S3 using the script in `./bin/publish-tests.sh`

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government licence v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable
information providers in the public sector to license the use and re-use of their information under a common open
licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
