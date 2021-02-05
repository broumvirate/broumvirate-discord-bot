const helpers = require("../helpers.js");
const axios = require("axios");

module.exports.help = "**&bhothm:** Generates a random meme.";

module.exports.command = (message, args) => {
    if(args.length === 0)
    {
        axios
            .get("http://broumvirate.com/api/bhothm")
            .then((response) => {
                message.channel.send(" ", { files: [response.data.url] });
            })
            .catch((error) => {
                console.log(error);
                message.channel.send("Unable to get meme.");
            });
    }
    else if (args[0] === "add")
    {
        const bhothmText = args.slice(1).join(" ");
        axios.post("http://broumvirate.com/api/bhothm", {text: bhothmText})
            .then((res) => {
                message.channel.send(`Added ${bhothmText} to meme database.`)
            }).catch((error) => {
                message.channel.send("Unable to add BHOTHMText")
            })
    }
};
