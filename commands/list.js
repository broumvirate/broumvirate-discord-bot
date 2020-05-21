const Discord = require("discord.js")
const tweet = require('./tweet.js');
const longo = require('mongoose');
const tweetindex = require("../schema/tweetindex.js");

module.exports.help = '**&list:** Lists all tweets.'

module.exports.command = message => {
    
    tweetindex.find({}, function (err, tweets) {
        if (err) {
            console.log(err)
            return;
        }
        let list = '';
        if (tweets.length == 0){
            message.reply(`there are no tweets currently in the index.`);
            return;
        }
        for (var i = 0; i < tweets.length; i++){
            list = `${list}\n${tweets[i].sort}: '${tweets[i].content}' [Yes: ${tweets[i].yes}/3] [No: ${tweets[i].no}/3]`
        }
        message.channel.send(list);
    })
   
}