const helpers = require("../helpers.js");
const axios = require("axios");

module.exports.help = "**&bhothm:** Generates a random meme.";

module.exports.command = (message) => {
    axios
        .get("http://broumvirate.com/api/bhothm")
        .then((response) => {
            message.channel.send(" ", { files: [response.data.url] });
        })
        .catch((error) => {
            console.log(error);
            // message.channel.send("Unable to get meme.");
        });
};
