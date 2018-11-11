module.exports = {
    translation: {
        SKILL_NAME: "Ayudame a comprar mi lambo",
        HELLO: [
            "¡Por supuesto! ¿en qué criptomoneda debo darte el precio de una lambo? También puede especificar un modelo en particular.",
        ],
        HELP: [
            `La operación es bastante simple, dime en qué criptomoneda debo decirte la cantidad de una lambo y si tienes un modelo favorito, ¡especifícalo!
             Por ejemplo, "¿Cuánto monero para una Lambo?" o "¿Cuánto btc para un Diablo Lamborghini?" o "¿Cuánto Ubiq para una Lamborghini?"`,
        ],
        HELP_REPROMPT: [
            `Ahora que sabes un poco más, vamos a empezar de nuevo. Especifique la criptomoneda y el modelo de
             Lamborghini si desea uno en particular. Te daré la cantidad necesaria ahora.`,
        ],
        FALLBACK_REPROMPT: [
            "Esta habilidad no puede ayudarte para eso. Ella puede informarle sobre el costo de una lambo en tiempo real. ¿Cómo puedo ayudarte?",
        ],
        FALLBACK_MESSAGE: ["Comment puis-je vous aider ?"],
        RES_CRYPTO_QT_WITH_MODEL: [
            "Actualmente te costará %s %s si quieres tu Lambo %s.",
            "¡Por %s %s puedes comprar tu Lambo %s 'ahora!",
            "Se necesitan %s %s si quieres esta Lamborghini %s.",
            "Necesitas %s %s",
        ],
        RES_CRYPTO_QT_NO_DATA: [
            "Hum, no tengo información sobre este modelo. Para un lambo estándar sin embargo, debes gastar %s %s.",
            "No encuentro este modelo en mis grabaciones. Sin embargo, para información, necesitarás más o menos %s %s para un lambo estándar.",
        ],
        RES_CRYPTO_QT_NO_MODEL: [
            "Actualmente, necesitas %s %s si lo quieres.",
            "¡Por %s %s puedes pedir tu lambo ahora mismo!",
            "Se necesitan %s %s si quieres uno.",
            "Necesitas %s %s.",
        ],
        STOP: ["Ok, paremos."],
        ERROR: ["Lo siento, no entendí el pedido. Repita por favor.", "Hum. No entendí, ¿puedes repetir?"],
    },
};
