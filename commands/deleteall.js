const tweetindex = require("../schema/tweetindex.js");

module.exports.command = (message, args) => {
    //Deletes all tweets, maybe.
    if (message.author.id != 186149455907520512) {
        return;
    } else {
        tweetindex.deleteMany({}, function (err) {
            console.log(err);
        });
    }
};
