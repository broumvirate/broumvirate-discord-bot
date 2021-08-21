const tweetindex = require("../schema/tweetindex.js");
const voter = require("../tweetumsVoter.js");

module.exports.help = "**&list:** Lists all tweets.";

module.exports.command = (message) => {
    tweetindex
        .find({$or:[{isArchived: false}, {isArchived: {$exists: false}}]})
        .then((tweets) => {
            if (tweets.length == 0) {
                message.reply(`there are no tweets currently in the index.`);
            } else {
                let list = "";
                for (let i = 0; i < tweets.length; i++) {
                    list = `${list}\n${tweets[i].sort}: '${tweets[i].content}' [Yes: ${tweets[i].yes.length}/3] [No: ${tweets[i].no.length}/3]`;
                }
                message.channel.send(list);

                if(tweets.filter((t) => t.canTweet === false).length >= 20)
                {
                    voter.archiveTweets(message, tweets);
                }
            
            }
        })
        .catch((err) => {
            console.log(err);
        });
};
