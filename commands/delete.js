const Discord = require("discord.js")
const longo = require("mongoose");
const tweetindex = require("../schema/tweetindex.js");

module.exports.command = async (message, args) => {
    //Deletes all tweets, maybe.
    if (message.author.id != 186149455907520512) {
        return
    }
    await tweetindex.deleteOne({
        sort: args[0]
    })


}
