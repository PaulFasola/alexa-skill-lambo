/* eslint-disable  func-names */
/* eslint-disable  no-console */
/* eslint-disable  no-use-before-define */

"use strict";

const Alexa = require("ask-sdk-core");
const i18n = require("i18next");
const sprintf = require("i18next-sprintf-postprocessor");
const https = require("https");

// Constants

// Cryptocompare is CC BY-NC 3.0, you should definitely try it!
const CRYPTO_PRICE_INFO_API =
    "https://min-api.cryptocompare.com/data/price?fsym={inputSymbol}&tsyms={outputCurrencies}";

const FALLBACK_MESSAGE = `This skill can\'t help you with that.  It can help you learn about Lambo and fancy crypto stuff. What can I help you with?`;
const FALLBACK_REPROMPT = "What can I help you with?";

// Requests

function getCryptoPriceInfo(symbol, outputCurrencies, callback) {
    const uri = CRYPTO_PRICE_INFO_API.replace("{inputSymbol}", symbol).replace("{outputCurrencies}", outputCurrencies);

    const req = https.request(uri, (res) => {
        res.setEncoding("utf8");
        let returnData = "";

        res.on("data", (chunk) => {
            returnData += chunk;
        });
        res.on("end", () => {
            const obj = JSON.parse(returnData);
            callback(obj);
        });
    });
    req.end();
}

// I18n
const languageStrings = {
    en: {
        translation: {},
    },
    "fr-FR": {
        translation: {},
    },
};

const LocalizationInterceptor = {
    process(handlerInput) {
        const localizationClient = i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
            resources: languageStrings,
            returnObjects: true,
        });

        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.lc = function(...args) {
            return localizationClient.lc(...args);
        };
    },
};

// Handlers
// ------------------------------------------------------------------------------

const LaunchHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === "LaunchRequest";
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;
        const speechOutput = "TEST";
        return responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    },
};

const AboutHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === "IntentRequest" && request.intent.name === "AboutIntent";
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;
        const requestAttributes = attributesManager.getRequestAttributes();

        return responseBuilder.speak(requestAttributes.t("ABOUT")).getResponse();
    },
};

const GetCryptoQtForLamboHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === "IntentRequest" && request.intent.name === "GetCryptoQtForLamboIntent";
    },

    handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        const targetedCryto = slots.cryptocurrency;
        const lamboPrice = 300000; // Temporary, need to create an online data source

        const resolution = targetedCryto.resolutions.resolutionsPerAuthority[0];
        const reliableInfos = resolution.values[0].value;

        if (resolution.status.code !== "ER_SUCCESS_MATCH") {
            throw "Bad resolution";
        }
        return new Promise((resolve) => {
            getCryptoPriceInfo(reliableInfos.id, "USD", (payload) => {
                const fiatValue = parseFloat(payload.USD);
                const result = Math.round(10000 * (lamboPrice / fiatValue)) / 10000;
                const speechOutput = `You need ${result} ${reliableInfos.name} for a lamborghini`;

                resolve(handlerInput.responseBuilder.speak(speechOutput).getResponse());
            });
        });
    },
};

const HelpHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === "IntentRequest" && request.intent.name === "AMAZON.HelpIntent";
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const requestAttributes = attributesManager.getRequestAttributes();
        return responseBuilder
            .speak(requestAttributes.t("HELP"))
            .reprompt(requestAttributes.t("HELP"))
            .getResponse();
    },
};

const StopHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return (
            request.type === "IntentRequest" &&
            (request.intent.name === "AMAZON.NoIntent" ||
                request.intent.name === "AMAZON.CancelIntent" ||
                request.intent.name === "AMAZON.StopIntent")
        );
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const requestAttributes = attributesManager.getRequestAttributes();
        return responseBuilder.speak(requestAttributes.t("STOP")).getResponse();
    },
};

const SessionEndedHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === "SessionEndedRequest";
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

        return handlerInput.responseBuilder.getResponse();
    },
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const request = handlerInput.requestEnvelope.request;

        console.log(`Error handled: ${error.message}`);
        console.log(` Original request was ${JSON.stringify(request, null, 2)}\n`);

        return handlerInput.responseBuilder
            .speak("Sorry, I can't understand the command. Please say again.")
            .reprompt("Sorry, I can't understand the command. Please say again.")
            .getResponse();
    },
};

const FallbackHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === "IntentRequest" && request.intent.name === "AMAZON.FallbackIntent";
    },

    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(FALLBACK_MESSAGE)
            .reprompt(FALLBACK_REPROMPT)
            .getResponse();
    },
};

// Init
// ------------------------------------------------------------------------------

const skillBuilder = Alexa.SkillBuilders.custom();
exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchHandler,
        AboutHandler,

        GetCryptoQtForLamboHandler,

        HelpHandler,
        StopHandler,
        FallbackHandler,
        SessionEndedHandler
    )
    .addRequestInterceptors(LocalizationInterceptor)
    .addErrorHandlers(ErrorHandler)
    .lambda();
