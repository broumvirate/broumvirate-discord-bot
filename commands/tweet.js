const tweetindex = require("../schema/tweetindex.js");

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

    tweetindex.find({content:tweet})
    .then((res) => {
        if(res.length > 0)
        {
            throw 'Tweet already exists';
        }
        return;
    })
    .then(() => {
        tweetindex
            .countDocuments()
            .then((id) => {
                return tweetindex.create({
                    content: tweet,
                    yes: [message.author.id],
                    no: [],
                    sort: id,
                });
            })
            .then((tweet) => {
                message.channel.send(
                    `${message.author.username} would like to tweet '${tweet.content}'. Use &vote [yes/no] ${tweet.sort} to vote.`
                );
                console.log("Tweeted", tweet.content);
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .catch(() => {
        message.reply("tweet already exists, commie.")
    })

};
