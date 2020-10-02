const tweetindex = require("../schema/tweetindex.js");
const longoman = require("../helpers.js");

module.exports.command = (message, args) => {
    if (message.author.id != 186149455907520512) {
        return;
    } else {
        tweetindex
            .findOne({ sort: args[0] })
            .then((currentTweet) => {
                //console.log(currenttweet);

                //If the tweet exists, continue processing.
                if (currentTweet) {
                    currentTweet.yes = 3;
                    return currentTweet.save();
                }
            })
            .then((currentTweet) => {
                longoman.checkvotes(message, currentTweet);
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
