const helpers = require("../helpers.js");

module.exports.help = "**&bhotm:** Reminds you when BHotM is due.";

module.exports.command = (message) => {
    message.channel.send(`BHotM submissions due in: ${helpers.bhotmString()}`);
};
