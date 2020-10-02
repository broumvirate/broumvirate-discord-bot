const Discord = require("discord.js");
const longo = require("mongoose");
const tweetindex = require("../schema/tweetindex.js");
const longoman = require("../helpers.js");

module.exports.command = async (message, args) => {
    if (message.author.id != 186149455907520512) {
        return;
    }
    tweetindex.exists(
        {
            sort: args[0],
        },
        async function (err, result) {
            if (err) {
                console.log(err);
            } else {
                //console.log(result);
                let currenttweet = await tweetindex.findOne({
                    sort: args[0],
                });
                //console.log(currenttweet);
                //If the tweet exists, continue processing.
                if (result) {
                    currenttweet.yes = 3;
                    currenttweet.save(function (err) {
                        if (err) {
                            console.log(err);
                        }
                        longoman.checkvotes(message, currenttweet);
                    });
                }
            }
        }
    );
};
