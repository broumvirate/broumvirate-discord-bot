require("dotenv").config();
const Discord = require("discord.js");
const tweetums = new Discord.Client();
const soundbroClient = new Discord.Client();
const soundbro = require("./soundbro.js");
const Twitter = require("twitter-lite");
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
        tweetums.on(eventName, (arg) => eventHandler(tweetums, arg));
    });
});

// Start Soundbro
soundbro.soundbro(soundbroClient);

// Login to bots
tweetums.login(process.env.TWEETUMS_TOKEN);
soundbroClient.login(process.env.SOUNDBRO_TOKEN);
