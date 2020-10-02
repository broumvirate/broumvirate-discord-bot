require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const Twitter = require("twitter-lite");
const fs = require("fs");
var requireDir = require("require-dir");
var commands = requireDir("../commands");

const prefix = "&";

module.exports = (client, message) => {
    //Check if message should be processed.
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }
    if (message.author.id == 280700923318108160) {
        message.channel.send("Error: User is Emerson");
        return;
    }
    //Break message into component parts and pass to relevant module.
    const args = message.content.split(" ");
    const command = args[0].substr(prefix.length);
    args.shift();
    //console.log(args)
    //console.log(command)
    //console.log(`../commands/${command}.js`)

    fs.access(`./commands/${command}.js`, function (err) {
        if (err) {
            // File does not exist
        } else {
            commands[command].command(message, args);
        }
    });
};
