require("dotenv").config()
const Discord = require("discord.js")
const Twitter = require("twitter-lite")
const fs = require("fs")

const twitclient = new Twitter({
    subdomain: "api",
    consumer_key: process.env.APP_KEY, // from Twitter.
    consumer_secret: process.env.APP_SECRET, // from Twitter.
    access_token_key: process.env.ACC_KEY, // from your User (oauth_token)
    access_token_secret: process.env.ACC_SECRET // from your User (oauth_token_secret)
});

module.exports.tweet = (message, tweetcontent) => {

    /*twitclient.post("statuses/update", {
        status: tweetcontent.content
    });*/
    
    message.channel.send(`Successfully tweeted '${tweetcontent.content}' to the Broumvirate account.`);
}
