/* eslint-disable  func-names */
/* eslint-disable  no-console */
/* eslint-disable  no-use-before-define */

"use strict";

const Alexa = require("ask-sdk-core");
const https = require("https");
const i18n = require("i18next");
const sprintf = require("i18next-sprintf-postprocessor");

const locales = {
    en: require("./locales/en"),
    fr: require("./locales/fr"),
    de: require("./locales/de"),
    es: require("./locales/es"),
    it: require("./locales/it"),
    jp: require("./locales/jp"),
};

// Constants

// Cryptocompare is CC BY-NC 3.0, you should definitely try it!
const CRYPTO_PRICE_INFO_API =
    "https://min-api.cryptocompare.com/data/price?fsym={inputSymbol}&tsyms={outputCurrencies}";

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

const LocalizationInterceptor = {
    process(handlerInput) {
        const localizationClient = i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            resources: locales,
            fallbackLng: "en",
        });

        localizationClient.localize = function() {
            const args = arguments;
            let values = [];

            for (var i = 1; i < args.length; i++) {
                values.push(args[i]);
            }
            const value = i18n.t(args[0], {
                returnObjects: true,
                sprintf: values,
                postProcess: "sprintf",
            });

            if (Array.isArray(value)) {
                return value[Math.floor(Math.random() * value.length)];
            } else {
                return value;
            }
        };

        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function(...args) {
            return localizationClient.localize(...args);
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
        const attributes = handlerInput.attributesManager.getRequestAttributes();
        const responseBuilder = handlerInput.responseBuilder;
        return responseBuilder
            .speak(attributes.t("HELLO"))
            .reprompt(attributes.t("HELLO"))
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

        const lamboModel = ""; // Temporary, need to create an online data source
        const lamboPrice = 300000; // Same thing

        const resolution = targetedCryto.resolutions.resolutionsPerAuthority[0];
        const reliableInfos = resolution.values[0].value;

        if (resolution.status.code !== "ER_SUCCESS_MATCH") {
            console.log("Bad resolution");
            return;
        }
        return new Promise((resolve) => {
            getCryptoPriceInfo(reliableInfos.id, "USD", (payload) => {
                const attributes = handlerInput.attributesManager.getRequestAttributes();
                const fiatValue = parseFloat(payload.USD);
                const result = Math.round(10000 * (lamboPrice / fiatValue)) / 10000;

                resolve(
                    handlerInput.responseBuilder
                        .speak(attributes.t("RES_CRYPTO_QT", result, reliableInfos.name, lamboModel))
                        .getResponse()
                );
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
            .reprompt(requestAttributes.t("REPROMPT"))
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
        const attributes = handlerInput.attributesManager.getRequestAttributes();

        console.log(`Error handled: ${error.message}`);
        console.log(`Original request was ${JSON.stringify(request, null, 2)}\n`);

        return handlerInput.responseBuilder
            .speak(attributes.t("ERROR"))
            .reprompt(attributes.t("ERROR"))
            .getResponse();
    },
};

const FallbackHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === "IntentRequest" && request.intent.name === "AMAZON.FallbackIntent";
    },

    // where are locale safe here, but just in case (future update)
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getRequestAttributes();
        return handlerInput.responseBuilder
            .speak(attributes.t("FALLBACK_MESSAGE"))
            .reprompt(attributes.t(FALLBACK_REPROMPT))
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
