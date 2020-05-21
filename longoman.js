const longo = require("mongoose");
const tweetindex = require("./schema/tweetindex.js");
const twitterhandler = require("./twitterhandler.js");

function fixSort() {
    tweetindex.find({}, async function (err, tweets) {
        if (err) {
            console.log(err)
        } else {
            for (var i = 0; i < tweets.length; i++) {
                tweets[i].sort = i;
                tweets[i].save();
            }
        }
    })
}

module.exports.checkvotes = async (message, tweet) => {
    if (tweet.yes >= 3) {
        await twitterhandler.tweet(message, tweet);
        tweet.remove(fixSort);
    }
    if (tweet.no >= 3) {
        message.channel.send(`'${tweet.content}' wasn't funny enough to post.`)
        tweet.remove(fixSort);
    }


}
