const tweetindex = require("../schema/tweetindex.js");
const voter = require("../tweetumsVoter.js");

module.exports.help =
    "**&vote [yes/no] [tweet id]:** Vote for a tweet in the running.";

module.exports.command = (message, args) => {
    //Checks if message should be processed.
    if (args.length != 2) {
        message.reply("that's not how you use that. Dumbass.");
        return;
    }
    //Checks if the tweet id exists.
    if (args[1] === "all") {
        // Vote all
        voter.voteAll(message, args[0]);
            
    } else {
        if(parseInt(args[1]) === -1) return;
        tweetindex
            .findOne({ sort: args[1] })
            .then((tweet) => {
                if(tweet.sort == -1) return;
                return voter.vote(message, args[0], tweet);
            })
            .catch((err) => console.log(err));
    }
};
