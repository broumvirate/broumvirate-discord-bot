const voter = require("../tweetumsVoter");

module.exports.help = "**&tweet:** Post a tweet to the index.";

module.exports.command = (message, args) => {
    //Checks if message should be processed.
    if (args.length < 1) {
        message.reply(
            "do you think I'm fuckin' stupid? There's no tweet there."
        );
        return;
    }

    //Consolidates args into string, creates a tweet in the database.
    const tweet = args.join(" ");

    voter.tweetText(message, tweet);
};
