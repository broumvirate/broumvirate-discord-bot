const longo = require("mongoose");
const tweetindex = require("./schema/tweetindex.js");
const twitterhandler = require("./twitterhandler.js");
const dayjs = require("dayjs");

function fixSort() {
    tweetindex.find({}, async function (err, tweets) {
        if (err) {
            console.log(err);
        } else {
            for (var i = 0; i < tweets.length; i++) {
                tweets[i].sort = i;
                tweets[i].save();
            }
        }
    });
}

module.exports.checkvotes = async (message, tweet) => {
    if (tweet.yes >= 3) {
        await twitterhandler.tweet(message, tweet);
        tweet.remove(fixSort);
    }
    if (tweet.no >= 3) {
        message.channel.send(`'${tweet.content}' wasn't funny enough to post.`);
        tweet.remove(fixSort);
    }
};

module.exports.bhotmString = function () {
    let distance = dueMoment().diff(dayjs());

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

// Function copied over from broumvirate.com codebase
function dueMoment(incJ) {
    //Returns next due date moment
    //Params: incJ:boolean. include judging period. If true, due date doesn't roll over until the 8th. if false or empty, rolls over on 5th.
    let day = 4;
    let dueDate;

    if (incJ) {
        day = 7;
    }
    if (dayjs().date() > day) {
        //if it's after the 4th, add a month and set submission time
        dueDate = dayjs().add(1, "M").date(5).startOf("day");
    } else {
        //if it's before the 4th, its this month
        dueDate = dayjs().date(5).startOf("day");
    }
    return dueDate;
}
