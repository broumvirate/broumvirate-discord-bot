const tweetindex = require("../schema/tweetindex.js");
const longoman = require("../helpers.js");
const voter = require('../tweetumsVoter.js');

module.exports.command = (message, args) => {
    if (
        message.author.id != longoman.nicknameTags.jacob &&
        message.author.id != longoman.nicknameTags.ben
    ) {
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
                voter.checkVotes(message, currentTweet);
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
