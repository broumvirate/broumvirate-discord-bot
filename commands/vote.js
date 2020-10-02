const tweetindex = require("../schema/tweetindex.js");
const longoman = require("../helpers.js");

module.exports.help =
    "**&vote [yes/no] [tweet id]:** Vote for a tweet in the running.";

module.exports.command = (message, args) => {
    //Checks if message should be processed.
    if (args.length != 2) {
        message.reply("that's not how you use that. Dumbass.");
        return;
    }
    //Checks if the tweet id exists.
    tweetindex
        .findOne({ sort: args[1] })
        .then((tweet) => {
            //If the tweet exists, continue processing.
            if (tweet) {
                //Check authors and see is this user has already voted for this tweet.
                if (tweet.voted.includes(message.author.id)) {
                    message.reply("you can't vote for a tweet twice.");
                } else {
                    //Assign correct vote boolean.
                    if (args[0] == "yes") {
                        tweet.yes++;
                        message.reply(
                            `you voted yes for the tweet '${currenttweet.content}'.`
                        );
                    }
                    if (args[0] == "no") {
                        tweet.no++;
                        message.reply(
                            `you voted no for the tweet '${currenttweet.content}'.`
                        );
                    }
                    //Add voter to the list of people who have voted.
                    tweet.voted.push(message.author.id);
                    return tweet.save();
                    //Check the votes, see if it should be deleted or tweeted.
                }
            } else {
                message.reply("that's not a real tweet.");
            }
        })
        .then((tweet) => {
            longoman.checkvotes(message, tweet);
        })
        .catch((err) => console.log(err));
};
