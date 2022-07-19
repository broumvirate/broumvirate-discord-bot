const tweetindex = require("../schema/tweetindex.js");

module.exports.help = "**&archive: number** View that page of the donttweet archive";

module.exports.command = (message, args) => {
    tweetindex
        .find({isArchived: true})
        .then((tweets) => {
            if(parseInt(args[0]) !== NaN)
            {
                const index = parseInt(args[0]);
                const chunkSize = 20;
                const chunks = []
                for(let i = 0; i < tweets.length; i += chunkSize)
                {
                    chunks.push(tweets.slice(i, i + chunkSize));
                }
                if(index >= chunks.length)
                {
                    message.reply("We don't have that many archived tweets, Mr. Crik.");
                }

                var selectedTweets = chunks[index];
                if(selectedTweets.length == 0) return;

                let list = "";
                for (let i = 0; i < selectedTweets.length; i++) {
                    list = `${list}\n${i}: '${tweets[i].content}' (Y ${tweets[i].yes.length}, N ${tweets[i].no.length})`;
                }
                message.channel.send(list);
            }
            else{
                message.reply("Need a number after that there command.")
            }
        })
}