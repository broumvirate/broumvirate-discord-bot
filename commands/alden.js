const voter = require("../tweetumsVoter");

module.exports.help = "**&alden:** It &tweets the latest #alden.";

module.exports.command = (message, args, client) => {
    client.channels
        .fetch("978106276041076788")
        .then((channel) =>
            channel.messages.fetch({ limit: 1, cache: false }).then((messages) => {
                voter.tweetText(message, messages.first().content);
            })
        )
};
