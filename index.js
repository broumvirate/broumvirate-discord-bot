require("dotenv").config();
const Discord = require("discord.js");
const tweetumsClient = new Discord.Client();
const soundbroClient = new Discord.Client();
const soundbro = require("./soundbro.js");
const fs = require("fs");
const longo = require("mongoose");

// Connect to the database
longo.connect(process.env.LONGO_TOKEN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Process files in events folder as event handlers.
fs.readdir("./events/", (err, files) => {
    files.forEach((file) => {
        const eventHandler = require(`./events/${file}`);
        const eventName = file.split(".")[0];
        tweetumsClient.on(eventName, (arg) =>
            eventHandler(tweetumsClient, arg)
        );
    });
});

// Start Soundbro
soundbro(soundbroClient);

// Login to bots
tweetumsClient.login(process.env.TWEETUMS_TOKEN);
soundbroClient.login(process.env.SOUNDBRO_TOKEN);
