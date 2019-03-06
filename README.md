# Q Election Votes [![Build Status](https://travis-ci.com/nzzdev/Q-election-votes.svg?branch=dev)](https://travis-ci.com/nzzdev/Q-election-votes) [![Greenkeeper badge](https://badges.greenkeeper.io/nzzdev/Q-election-votes.svg)](https://greenkeeper.io/)

**Maintainer**: [benib](https://github.com/benib)

Q election votes is one tool of the Q toolbox to display results of parliamentary elections.
Test it in the [demo](https://editor.q.tools)

## Table of contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Functionality](#functionality)
- [License](#license)

## Installation

```bash
git clone git@github.com:nzzdev/Q-election-votes.git
cd ./Q-election-votes
nvm use
npm install
npm run build
```

## Configuration

No configuration is needed for this tool.

## Development

Start the Q dev server:

```
npx @nzz/q-cli server
```

Run the Q tool:

```
node index.js

```

[to the top](#table-of-contents)

## Testing

The testing framework used in this repository is [Code](https://github.com/hapijs/code).

Run the tests:

```
npm run test
```

### Implementing a new test

When changing or implementing...

- A `route`, it needs to be tested in the `e2e-tests.js` file
- Something on the frontend, it needs to be tested in the `dom-tests.js` file

[to the top](#table-of-contents)

## Deployment

We provide automatically built docker images at https://hub.docker.com/r/nzzonline/q-election-votes/.
There are three options for deployment:

- Use the provided images
- Build your own docker images
- Deploy the service using another technology

### Use the provided docker images

1. Deploy `nzzonline/q-election-votes` to a docker environment

## Functionality

Here is what the tool looks like on mobile and other devices. The example shows intermediate results of the elections in the Netherlands in 2017. It's in German because we do not have multilanguage support (yet).

![Election results as shown on other devices](https://github.com/nzzdev/Q-election-votes/blob/master/readme-images/votes_desk.png)
![Election results as shown on mobile](https://github.com/nzzdev/Q-election-votes/blob/master/readme-images/votes_mob.png)

Each graphic has the following three sections:

- Header: contains specified title and subtitle
- Main Part: displays results for each party including the trend compared to last elections and - if present - a threshold line indicating if a party will be part of the parliament. Parties are sorted by percentage value.
- Footer: contains further notes (e.g. how many municipalities already finished counting), source(s) and update information

The tool structure follows the general structure of each Q tool. Further information can be found in [Q server documentation - Developing tools](https://nzzdev.github.io/Q-server/developing-tools.html).

There is only one endpoint to get `renderingInfo` in this tool:

### `/rendering-info/html-static`

This endpoint returns a renderingInfo object with static HTML/CSS/SVG that is fully responsive.

### Options

#### hideUpdatedDate

This option is only available for users with the `expert-election-votes` roles. It hides the updated date and is mainly used when you enter historic data where the last updated date makes no sense.

[to the top](#table-of-contents)

#### Display options

##### hideTitle

If checked the title doesn't get rendered.

## LICENSE

Copyright (c) 2019 Neue Zürcher Zeitung.

This software is licensed under the [MIT](LICENSE) License.
