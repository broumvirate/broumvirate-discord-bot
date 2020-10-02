const Discord = require("discord.js");
const longo = require("mongoose");
const tweetindex = require("../schema/tweetindex.js");
const longoman = require("../helpers.js");

module.exports.help =
    "**&vote [yes/no] [tweet id]:** Vote for a tweet in the running.";

module.exports.command = async (message, args) => {
    //Checks if message should be processed.
    if (args.length != 2) {
        message.reply("that's not how you use that. Dumbass.");
        return;
    }
    //Checks if the tweet id exists.
    tweetindex.exists(
        {
            sort: args[1],
        },
        async function (err, result) {
            if (err) {
                console.log(err);
            } else {
                //console.log(result);
                let currenttweet = await tweetindex.findOne({
                    sort: args[1],
                });
                //console.log(currenttweet);
                //If the tweet exists, continue processing.
                if (result) {
                    //Check authors and see is this user has already voted for this tweet.
                    if (currenttweet.voted.includes(message.author.id)) {
                        message.reply("you can't vote for a tweet twice.");
                        return;
                    }
                    //Assign correct vote boolean.
                    if (args[0] == "yes") {
                        currenttweet.yes++;
                        message.reply(
                            `you voted yes for the tweet '${currenttweet.content}'.`
                        );
                    }
                    if (args[0] == "no") {
                        currenttweet.no++;
                        message.reply(
                            `you voted no for the tweet '${currenttweet.content}'.`
                        );
                    }
                    //Add voter to the list of people who have voted.
                    currenttweet.voted.push(message.author.id);
                    currenttweet.save(function (err) {
                        if (err) {
                            console.log(err);
                        }
                        longoman.checkvotes(message, currenttweet);
                    });
                    //Check the votes, see if it should be deleted or tweeted.
                } else {
                    message.reply("that's not a real tweet.");
                }
            }
        }
    );
};
