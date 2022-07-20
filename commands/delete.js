const tweetindex = require("../schema/tweetindex.js");
const longoman = require("../helpers.js");
const voter = require("../tweetumsVoter");

module.exports.command = async (message, args) => {
    if((parseInt(args[0]) || args[0] == "0") && longoman.isAdmin(message))
    {
        if(parseInt(args[0]) < 0 ) return;
        const deleted = await tweetindex.deleteOne({
            sort: parseInt(args[0]),
        });
        voter.fixSort();
    }
    else{
        message.reply("unable to comply, partner.")
    }
};
