module.exports = {
    translation: {
        SKILL_NAME: "Aide moi a acheter ma lambo",
        HELLO: [
            "Bien-sûr, précisez la crypto-monnaie et  le modèle de Lamborghini si vous en souhaitez un en particulier. Je vous donnerai la quantité nécessaire actuellement.",
        ],
        HELP: [
            `Le fonctionnement est plutôt simple, dites moi dans quelle crypto-monnaie je dois 
             vous indiquer le montant d'une lambo' et si vous avez un modèle de prédilection, précisez le ! 
             Par exemple, "Combien de monero pour une lambo' ?" ou "Combien de btc pour une Lamborghini 
             Diablo ?" ou encore "Combien d'Ubiq pour une Lamborghini ?"`,
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
        ERROR: [
            "Désolé, je n'ai pas compris la commande. Veuillez répéter.",
            "Oups, je n'ai pas compris, pouvez-vous répéter ? ?",
        ],
    },
};
