const longo = require("mongoose");
const tweetindex = require("./schema/tweetindex.js");
const twitterhandler = require("./twitterhandler.js");

const yes = ['yes', 't'];
const no = ['no', 'k'];

function voteToBool(arg)
{
    if(yes.includes(arg)) return true;
    if(no.includes(arg)) return false;
    return null;
}

async function vote(message, voteArg, tweet) {

    // Checking to see if they actually voted right
    const vote = voteToBool(voteArg);
    const id = message.author.id;
    console.log(vote, voteArg);
    if(vote === null)
    {
        message.reply("that's not how you do that.")
        return;
    }

    // Get rid of 'em from the voter rolls
    if(tweet.yes.includes(id))
    {
        tweet.yes = tweet.yes.filter((el) => el != id);
    }
    if(tweet.no.includes(id))
    {
        tweet.no = tweet.no.filter((el) => el != id);
    }

    // Vote now
    if(vote === true)
    {
        tweet.yes.push(id);
        const tweetsLeft = 3 - tweet.yes.length;
        message.reply(
            `you voted yes for the tweet '${tweet.content}'. ${tweetsLeft} more to post.`
        );
    }
    else if (vote === false)
    {
        tweet.no.push(id);
        const tweetsLeft = 3 - tweet.no.length;
        message.reply(
            `you voted no for the tweet '${tweet.content}'. ${tweetsLeft} more to delete`
        );
    }
    await tweet.save()
    checkVotes(message, tweet);
}

async function checkVotes(message, tweet)
{
    if (tweet.yes.length >= 3) {
        if(tweet.canTweet)
        {
            await twitterhandler.tweet(message, tweet);
            tweet.remove(fixSort);
        }
        else{
            message.channel.send(`Sorry, not allowed to tweet that.`);
        }
    }
    if (tweet.no.length >= 3) {
        message.channel.send(`'${tweet.content}' wasn't funny enough to post.`);
        tweet.remove(fixSort);
    }
}

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

module.exports = {vote, checkVotes}