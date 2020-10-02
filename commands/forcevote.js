const tweetindex = require("../schema/tweetindex.js");
const longoman = require("../helpers.js");

module.exports.command = (message, args) => {
    if (message.author.id != 186149455907520512) {
        return;
    } else {
        tweetindex
            .exists({ sort: args[0] })
            .then((result) => {
                //console.log(result);
                return tweetindex
                    .findOne({ sort: args[0] })
                    .then((currentTweet) => {
                        //console.log(currenttweet);

                        //If the tweet exists, continue processing.
                        if (result) {
                            currenttweet.yes = 3;
                            return currenttweet.save().then(() => {
                                longoman.checkvotes(message, currenttweet);
                            });
                        }
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
