module.exports = {
    translation: {
        SKILL_NAME: "help me buy my Lambo",
        HELLO: [
            "Sure! In which crypto-currency do you want the amount ? You can also indicate me the model of the lambo you want!",
        ],
        HELP: [
            `This skill is simple, just tell me in which crypto I have to tell you the 
             price of the lambo and the desired model if you have it. Let me tell you 
             an example. "How much Ethereum for a lambo?" or "How much btc for a Lamborghini 
             Diablo?" and finally "How much Ubiq for a Lamborghini?"`,
        ],
        HELP_REPROMPT: [
            `Now that you know more about this skill, let's try again!
             In which crypto-currency do you want the amount ? You can also indicate me the model 
             of the lambo you want!`,
        ],
        FALLBACK_REPROMPT: [
            "This skill can't help you with that. It can help you learn about Lambo and fancy crypto stuff. What can I help you with?",
        ],
        FALLBACK_MESSAGE: ["What can I help you with?"],
        RES_CRYPTO_QT_WITH_MODEL: [
            "At this time, you need %s %s if you want to buy your Lambo %s.",
            "For %s %s, you can buy your Lambo' %s right now !",
            "%s %s are actually necessary if you want this Lamborghini %s.",
            "You need %s %s",
        ],
        RES_CRYPTO_QT_NO_DATA: [
            "Hum, I dont have any information regarding this model. For a classic lambo, you will need to spend %s %s.",
            "I can't find this model in my records. For your information, you need approximately %s %s for a classic one.",
        ],
        RES_CRYPTO_QT_NO_MODEL: [
            "At this time, you need %s %s if you want to buy a Lambo.",
            "For %s %s, you can buy your Lambo' right now !",
            "%s %s are actually necessary if you want it.",
            "You need %s %s",
        ],
        STOP: ["Okay, let's stop."],
        ERROR: [
            "Sorry, I can't understand the command. Please say again.",
            "Oupsy, I don't get it... Can you say again ?",
        ],
    },
};
