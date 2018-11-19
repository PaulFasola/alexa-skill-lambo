module.exports = {
    translation: {
        SKILL_NAME: "Aide moi a acheter ma lambo",
        HELLO: [
            "Dans quelle crypto-monnaie dois-je vous donner le prix d'une lambo ? Vous pouvez aussi préciser un modèle en particulier.",
        ],
        HELP: [
            `Le fonctionnement est plutôt simple, dites moi dans quelle crypto-monnaie je dois 
             vous indiquer le montant d'une lambo' et si vous avez un modèle de prédilection, précisez le ! 
             Par exemple, "Combien de monero pour une lambo' ?" ou encore "Combien de bitcoin pour une Lamborghini 
             Diablo ?""`,
        ],
        HELP_REPROMPT: [
            `Maintenant que vous en savez un peu plus, recommençons ! Précisez la crypto-monnaie et le 
             modèle de Lamborghini si vous en souhaitez un en particulier. Je vous donnerai la quantité 
             nécessaire actuellement.`,
        ],
        FALLBACK_REPROMPT: [
            "Cette skill ne peut pas vous aider pour cela. Elle peut vous informer sur le coût d'une lambo en temps réel. Comment puis-je donc vous aider ?",
        ],
        FALLBACK_MESSAGE: ["Comment puis-je vous aider ?"],
        RES_CRYPTO_QT_WITH_MODEL: [
            "Actuellement, il faudra %s %s si vous voulez votre Lambo %s.",
            "Pour %s %s, vous pouvez acheter votre Lambo' %s dés maintenant !",
            "%s %s sont nécéssaires si vous souhaitez cette Lamborghini %s.",
            "Il vous faut %s %s",
        ],
        RES_CRYPTO_QT_NO_DATA: [
            "Hum, je n'ai pas d'informations concernant ce modèle. Pour une lambo standard cependant, vous devez dépenser %s %s.",
            "Je n'arrive pas à trouver ce modèle dans mes enregistrements. Cependant, pour information, il vous faudra plus ou moins %s %s pour une lambo standard.",
        ],
        RES_CRYPTO_QT_NO_MODEL: [
            "Actuellement, il vous faut %s %s si vous la voulez.",
            "Pour %s %s, vous pouvez commander votre lambo tout de suite !",
            "%s %s sont nécéssaires si vous en voulez une.",
            "Il vous faut %s %s",
        ],
        STOP: ["D'accord, on arrête."],
        ERROR: [
            "Oups, je n'ai pas compris, dans quelle crypto-monnaie souhaitez-vous que je vous donne le montant d'une Lamborghini ?",
        ],
    },
};
