const Discord = require("discord.js");
const longo = require("mongoose");
const tweetindex = require("../schema/tweetindex.js");

module.exports.help = "**&tweet:** Post a tweet to the index.";

module.exports.command = async (message, args) => {
    //Checks if message should be processed.
    if (args.length < 1) {
        message.reply(
            "do you think I'm fuckin' stupid? There's no tweet there."
        );
        return;
    }
    console.log(args);

    //Consolidates args into string, creates a tweet in the database.
    const tweet = args.join(" ");

    let id = await tweetindex.countDocuments();

    await tweetindex.create({
        content: tweet,
        yes: 1,
        no: 0,
        voted: message.author.id,
        sort: id,
    });

    message.channel.send(
        `${message.author.username} would like to tweet '${tweet}'. Use &vote [yes/no] ${id} to vote.`
    );
};
