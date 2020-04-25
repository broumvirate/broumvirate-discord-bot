require("dotenv").config()
const Discord = require("discord.js")
const client = new Discord.Client()
const Twitter = require("twitter-lite")
const fs = require("fs")

const twitclient = new Twitter({
    subdomain: "api",
    consumer_key: process.env.APP_KEY, // from Twitter.
    consumer_secret: process.env.APP_SECRET, // from Twitter.
    access_token_key: process.env.ACC_KEY, // from your User (oauth_token)
    access_token_secret: process.env.ACC_SECRET // from your User (oauth_token_secret)
});


const prefix = "&";
const votesreq = 3;
let tweetsarr = [];

client.on('ready', () => {
    console.log("I'm here, fuck you");
    client.user.setActivity("&help", {
        type: "STREAMING"
    });
})

client.on('message', message => {

    if (message.content.startsWith(prefix) && !message.author.bot && message.author.id != 80700923318108160) {

        const split = message.content.split(" ");
        const command = split.slice(0, 1);

        if (command == "&tweet") {
            split.shift();
            const content = split.join(" ");
            if (content != ""){

                let tweet = {
                    content: content,
                    yes: 1,
                    no: 0,
                    id: 0,
                    users: [message.author]
                };

                tweetsarr.push(tweet);
                tweetsarr.forEach((element, index) => {
                    element.id = index;
                    console.log(index);
                    console.log(message.author);
                });
                message.channel.send(message.author.username + " would like to tweet: ```" + tweet.content + "```&vote to enter a vote.");
            } else {
                message.reply("do you think I'm fuckin' stupid? There's no tweet there.")
            }
        }

        if (command == "&vote") {
            if (split.length == 3) {
                const votestate = split[1];
                const votenum = parseInt(split[2]);
                console.log(votestate);
                console.log(votenum);
                if (tweetsarr[votenum]) {
                    if (!tweetsarr[votenum].users.includes(message.author)) {
                        if (votestate.toLowerCase() == "yes") {
                            tweetsarr[votenum].yes++;
                            if (tweetsarr[votenum].yes >= votesreq) {
                                twitclient.post("statuses/update", {
                                    status: tweetsarr[votenum].content
                                });
                                message.channel.send("```" + tweetsarr[votenum].content + "``` has been tweeted to the Broumvirate account.")
                                tweetsarr.splice(votenum, 1);
                            }
                        } else if (votestate.toLowerCase() == "no") {
                            tweetsarr[votenum].no++;
                            if (tweetsarr[votenum].no >= votesreq) {
                                tweetsarr.splice(votenum, 1);
                                message.channel.send("```" + tweetsarr[votenum].content + "``` has been terminated.")
                            }
                        }
                        tweetsarr[votenum].users.push(message.author);
                        console.log(tweetsarr[votenum]);

                    }
                }

                if (!tweetsarr[votenum]) {
                    message.reply("that's not a real tweet.");
                } else if (tweetsarr[votenum].users.includes(message.author)) {
                    message.reply("fuck off. No voting for the same tweet twice.");
                }

            } else {
                message.reply("&vote [yes/no] [index]. Dumbass.")
            }
        }
        if (command == "&index") {
            tweetsarr.forEach(element => {
                message.channel.send(element.id + ". " + element.content)

            });

        }
        if (command == "&help") {
            message.channel.send("**&tweet [tweet]:** Add a tweet to the running. \n**&vote [yes/no] [index]:** Vote yes or no for an indexed tweet. \n**&index:** Show all tweets currently in the index.");
        }
    }
    if (message.content.startsWith(prefix) && message.author.id == 280700923318108160) {
        message.channel.send("Error: User is Emerson");
    }
})


client.login(process.env.BOT_TOKEN)
