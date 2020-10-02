const tweetindex = require("../schema/tweetindex.js");

module.exports.help = "**&list:** Lists all tweets.";

module.exports.command = (message) => {
    tweetindex
        .find({})
        .then((tweets) => {
            if (tweets.length == 0) {
                message.reply(`there are no tweets currently in the index.`);
            } else {
                let list = "";
                for (let i = 0; i < tweets.length; i++) {
                    list = `${list}\n${tweets[i].sort}: '${tweets[i].content}' [Yes: ${tweets[i].yes}/3] [No: ${tweets[i].no}/3]`;
                }
                message.channel.send(list);
            }
        })
        .catch((err) => {
            console.log(err);
        });
};
