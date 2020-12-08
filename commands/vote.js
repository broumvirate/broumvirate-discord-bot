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
    if (args[1] === "all") {
        tweetindex
            .find({})
            .then((tweets) => {
                let totalTweets = tweets.reduce((acc, tweet) => {
                    if (tweet.voted.includes(message.author.id)) {
                        return acc;
                    } else {
                        //Assign correct vote boolean.
                        if (args[0] !== "yes" && args[0] !== "no") {
                            return acc;
                        }
                        if (args[0] == "yes") {
                            tweet.yes++;
                        } else if (args[0] == "no") {
                            tweet.no++;
                        }
                        acc++;
                        //Add voter to the list of people who have voted.
                        tweet.voted.push(message.author.id);
                        tweet.save().then((tweet) => {
                            try {
                                longoman.checkvotes(message, tweet);
                            } catch {
                                console.log("Couldn't check votes.");
                            }
                        });
                    }
                    return acc;
                }, 0);
                message.reply(
                    `you voted ${args[0]} on ${totalTweets} tweets. Nice work.`
                );
            })
            .catch((err) => console.log(err));
    } else {
        tweetindex
            .findOne({ sort: args[1] })
            .then((tweet) => {
                //If the tweet exists, continue processing.
                if (tweet) {
                    //Check authors and see is this user has already voted for this tweet.
                    if (tweet.voted.includes(message.author.id)) {
                        message.reply("you can't vote for a tweet twice.");
                    } else {
                        //Assign correct vote boolean
                        if (args[0] !== "yes" && args[0] !== "no") {
                            return message.reply(
                                "that's not how you use that. Dumbass."
                            );
                        }
                        if (args[0] == "yes") {
                            tweet.yes++;
                            message.reply(
                                `you voted yes for the tweet '${tweet.content}'.`
                            );
                        }
                        if (args[0] == "no") {
                            tweet.no++;
                            message.reply(
                                `you voted no for the tweet '${tweet.content}'.`
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
                try {
                    longoman.checkvotes(message, tweet);
                } catch {
                    console.log("Couldn't check votes.");
                }
            })
            .catch((err) => console.log(err));
    }
};
