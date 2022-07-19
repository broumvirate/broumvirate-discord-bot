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
                const chunks = tweets.reduce((resultArray, item, index) => {
                    const chunkIndex = Math.floor(index/chunkSize);
                    if(!resultArray[chunkIndex]) {
                        resultArray[chunkIndex] = [] // start a new chunk
                    }
                    
                      resultArray[chunkIndex].push(item)
                    
                      return resultArray
                }, [])
                if(index >= chunks.length)
                {
                    message.reply("We don't have that many archived tweets, Mr. Crik.");
                }

                var selectedTweets = chunks[index]
                if(selectedTweets.length == 0) return;

                let list = "";
                const startingIndex = (index == 0) ? 0 : chunks.slice(0, index).reduce((val, arr) => {
                    val += arr.length;
                    return val;
                }, 0);

                for (let i = 0; i < selectedTweets.length; i++) {
                    let twt = selectedTweets[i]
                    list = `${list}\n${startingIndex + i}: '${twt.content}' (Y ${twt.yes.length}, N ${twt.no.length})`;
                }
                message.channel.send(list);
            }
            else{
                message.reply("Need a number after that there command.")
            }
        })
}