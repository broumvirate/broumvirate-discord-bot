const tweetindex = require("../schema/tweetindex.js");
const longoman = require("../helpers.js");

module.exports.command = (message, args) => {
    //Deletes all tweets, maybe.
    if (
        message.author.id != longoman.nicknameTags.jacob &&
        message.author.id != longoman.nicknameTags.ben
    ) {
        return;
    } else {
        tweetindex.deleteMany({}, function (err) {
            console.log(err);
        });
    }
};
