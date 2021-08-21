const tweetindex = require("../schema/tweetindex.js");

module.exports.help = "**&archive: number** View that page of the donttweet archive";

module.exports.command = (message, args) => {
    tweetindex
        .find({isArchived: true})
        .then((tweets) => {
            if(parseInt(args[0]) !== NaN)
            {
                let startingTweet = (args[0] - 1) * 20;
                let endingTweet = startingTweet + 20;

                var selectedTweets = tweets.slice(startingTweet, endingTweet);
                if(selectedTweets.length == 0) return;

                let list = "";
                for (let i = 0; i < tweets.length; i++) {
                    list = `${list}\n${i}: '${tweets[i].content}' (Y ${tweets[i].yes.length}, N ${tweets[i].no.length})`;
                }
                message.channel.send(list);
            }
            else{
                message.reply("Need a number after that there command.")
            }
        })
}