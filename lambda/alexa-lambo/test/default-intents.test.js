const alexaTest = require("alexa-skill-test-framework");
const alexaSkill = require("../index.js");
const locales = require("../locales");

require("dotenv").config();

// Initialization
alexaTest.initialize(alexaSkill, process.env.ALEXA_SKILL_ID, process.env.ALEXA_ACCOUNT_ID);
alexaTest.initializeI18N(locales);

const exitIntents = ["AMAZON.NoIntent", "AMAZON.CancelIntent", "AMAZON.StopIntent"];

const assertIfUnexpectedResponse = (id, context, response) => {
    const captions = context.t(id);
    const rawSpeech = response.replace(/<(?:.|\n)*?>/gm, "");

    let found = false;

    captions.forEach((caption) => {
        if (rawSpeech === caption) found = true;
    });

    if (!found)
        context.assert({ message: `Unexpected response "${rawSpeech}". Was expected : ${JSON.stringify(captions)}` });
};

for (const locale in locales) {
    alexaTest.setLocale(locale);

    describe(`DEFAULT intents testing - Locale: ${locale}`, () => {
        describe("LaunchRequest", function() {
            alexaTest.test([
                {
                    request: alexaTest.getLaunchRequest(),
                    saysCallback: (context, response) => assertIfUnexpectedResponse("HELLO", context, response),
                },
            ]);
        });

        describe("AMAZON.HelpIntent", () => {
            alexaTest.test([
                {
                    request: alexaTest.getIntentRequest("Amazon.HelpIntent"),
                    saysCallBack: (context, response) => assertIfUnexpectedResponse("HELP", context, response),
                    reprompts: alexaTest.t("HELP_REPROMPT"),
                    shouldEndSession: false,
                },
            ]);
        });

        exitIntents.forEach((intentName) =>
            describe(`${intentName} (exit)`, () => {
                alexaTest.test([
                    {
                        request:
                            intentName === ""
                                ? alexaTest.getSessionEndedRequest()
                                : alexaTest.getIntentRequest(intentName),
                        saysCallBack: (context, response) => assertIfUnexpectedResponse("STOP", context, response),
                        repromptsNothing: true,
                        shouldEndSession: true,
                    },
                ]);
            })
        );
    });
}
