const tweetindex = require("../schema/tweetindex.js");

module.exports.help = "**&donttweet:** Post a tweet to the index that we aren't allowed to tweet.";

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

    tweetindex
        .countDocuments()
        .then((id) => {
            return tweetindex.create({
                content: tweet,
                yes: [message.author.id],
                no: [],
                sort: id,
                canTweet: false
            });
        })
        .then((tweet) => {
            message.channel.send(
                `${message.author.username} would like to not tweet '${tweet.content}'. Use &vote [yes/no] ${tweet.sort} to vote.`
            );
        })
        .catch((err) => {
            message.channel.send("OH NO.")
            console.log(err);
        });
};
