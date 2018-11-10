# Alexa, help me buy my lambo!

![android: 6.0.1](https://img.shields.io/badge/version:-1.0-green.svg "version-1.0")
![building: yes](https://img.shields.io/badge/published:-pending-blue.svg "published-pending")

This Alexa skill allows you to get the price of the lambo of your dreams in the crypto-currency of your choice.

This is a WIP o/ (and this is only for fun / Alexa skill dev. discovery)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
See deployment for instructions on how to get it live.

### Prerequisites

For testing and deploying purposes, you will need Mocha and Lambda-Local installed globally.

```
    npm i -g mocha lamda-local
```

### Installing

There is no specificities, just run this command from the root of the cloned/downloaded repo:

```
    cd lambda/alexa-lambo & npm install
```

You need to create a .env file from the .env.example and fill it accordingly:

## Alexa

```
# https://developer.amazon.com/alexa/console/ask > Your Skill > Endpoints > "Your Skill ID"
# GUID format : xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
ALEXA_SKILL_ID=amzn1.ask.skill.[GUID]

# https://console.aws.amazon.com/iam/home?#/security_credential > Account Identifiers > "canonical user ID"
AWS_ACCOUNT_ID=amzn1.ask.account.[LONG_STRING]
```

## Tests

```
    npm test
```

This will launch mocha, and everything should pass! (if not, check your .env).

## Deployment

TBD.

## Built With

- [Ask SDK](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs) - The Alexa SDK
- [Lambda-local](https://github.com/ashiina/lambda-local) - Local dev (and packaging/deployment tool soon)
- [Alexa Skill Test Framework](https://github.com/BrianMacIntosh/alexa-skill-test-framework) - Testing

## Roadmap

V.1.1

- [x] Implements the unit tests
- [ ] Output SSML instead of strings (mainly for some phoneme issues)
- [ ] Add another ticker API (fallback)
- [x] Migrate the server side to AWS Lambda
- [ ] Add more content (strings) and locales
- [x] HODL

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE.md](LICENSE.md) file for details
