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

The app tests run on a BrowserStack real device using `wdio.browserstack.conf.js`:

```bash
npm run test:browserstack
```

Set `BROWSERSTACK_USERNAME`, `BROWSERSTACK_KEY` and `BROWSERSTACK_APP_ID` in your shell or in `.env`. Optional overrides: `BROWSERSTACK_DEVICE`, `BROWSERSTACK_OS_VERSION`, `APP_BUNDLE_ID`.

### Running on the iOS Simulator

Requires Xcode and Appium with the XCUITest driver (`npm i -g appium && appium driver install xcuitest`).

```bash
./bin/build-simulator-app.sh   # builds DEFRA/mmo-cr-ios main into ./apps/record-catch.app
npm run test:local
```

Optional overrides: `SIMULATOR_DEVICE` (default `iPhone 17`), `SIMULATOR_OS_VERSION` (default `27.0`), `APP_PATH`.

### Test structure

```
test/
  specs/            one file per feature; journeys/ drives the real app end to end
  screens/          screen objects, located by the app's accessibility identifiers
  support/
    app.js          launchApp(Seam.x) relaunches the app, optionally seeded at a screen
    selectors.js    selector helpers (byId, byText, ...)
    test-data.js    stub data the app ships with
```

- Feature specs use the app's `-uiTest*` launch arguments (`Seam` in `test/support/app.js`) to open a screen directly with known data, so each test is independent. Keep `Seam` in step with `LaunchArguments.swift` in [DEFRA/mmo-cr-ios](https://github.com/DEFRA/mmo-cr-ios).
- Locate elements by accessibility identifier (`CatchRecord.<screen>.<element>`), not by copy, so tests survive text and Welsh-language changes.
- To cover a new catch-record screen, add one line to `test/screens/catch-record.screens.js` (`new JourneyScreen('CatchRecord.<screen>')`) and a spec under `test/specs/catch-record/`.

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
