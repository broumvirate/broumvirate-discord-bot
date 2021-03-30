const tweetindex = require("../schema/tweetindex.js");
const longoman = require("../helpers.js");

module.exports.command = (message, args) => {
    //Deletes all tweets, maybe.
    if (longoman.isAdmin(message)) {
        tweetindex.deleteMany({}, function (err) {
            console.log(err);
        });
    }
};
