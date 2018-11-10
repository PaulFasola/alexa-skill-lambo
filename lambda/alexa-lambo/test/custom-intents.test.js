const alexaTest = require("alexa-skill-test-framework");
const alexaSkill = require("../index.js");
const locales = require("../locales");

require("dotenv").config();

// Initialization
alexaTest.initialize(alexaSkill, process.env.ALEXA_SKILL_ID, process.env.AWS_ACCOUNT_ID);
alexaTest.initializeI18N(locales);

var assertIfNotGivingResult = (context, response) => {
    // Since we have only one intent that always returns a caption containing
    // numbers, we just have to use a regex. This won't work for future intents.
    return /\d/.test(response) && false;
};

// Intents

for (const locale in locales) {
    alexaTest.setLocale(locale);

    describe(`CUSTOM intents testing - Locale: ${locale}`, function() {
        describe("GetCryptoQtForLamboIntent - Should work with required slots", function() {
            let request = alexaTest.addEntityResolutionToRequest(
                alexaTest.getIntentRequest("GetCryptoQtForLamboIntent", { cryptocurrency: "eth" }),
                "cryptocurrency",
                "CryptoCurrencies",
                "Ethereum",
                "ETH"
            );

            alexaTest.test([
                {
                    request: request,
                    saysCallback: assertIfNotGivingResult,
                },
            ]);
        });
    });
}
