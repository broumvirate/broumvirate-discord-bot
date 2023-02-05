require("dotenv").config();
const Twitter = require("twitter-lite");
var Masto = require('mastodon')

class TwitterHandler {
    constructor()
    {
        this.twitClient = new Twitter({
            subdomain: "api",
            consumer_key: process.env.APP_KEY, // from Twitter.
            consumer_secret: process.env.APP_SECRET, // from Twitter.
            access_token_key: process.env.ACC_KEY, // from your User (oauth_token)
            access_token_secret: process.env.ACC_SECRET, // from your User (oauth_token_secret)
        });
    }

    tweet(text, image){
        return this.twitClient.post("statuses/update", {
            status: text,
        });
    }
}

class MastodonHandler{
    constructor(){
        this.masto = new Masto({
            access_token: process.env.MASTO_TOKEN,
            timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
            api_url: 'https://mstdn.social/api/v1/', // optional, defaults to https://mastodon.social/api/v1/
          });
    }

    tweet(text, image){
        return this.masto.post('statuses', {status: text});
    }
}

const handlers = [new TwitterHandler(), new MastodonHandler()]

module.exports.tweet = (message, tweetcontent) => {
    return Promise.all(handlers.map(handl => handl.tweet(tweetcontent.content, tweetcontent.image)))
        .then(() => {
            message.channel.send(
                `Successfully tweeted '${tweetcontent.content}' to the Broumvirate account(s).`
            );
        })
        .catch(() => {
            message.channel.send("Failed to tweet to at least one Broumvirate account.");
        })
};
