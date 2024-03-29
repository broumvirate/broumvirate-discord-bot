const longo = require("mongoose");
const tweetindex = require("./schema/tweetindex.js");
const twitterhandler = require("./twitterhandler.js");

const yes = ['yes', 't', 'y'];
const no = ['no', 'k', 'n'];

function tweetText(message, tweet) {
    tweetindex.find({content:tweet})
    .then((res) => {
        if(res.length > 0)
        {
            throw 'Tweet already exists';
        }
        return;
    })
    .then(() => {
        return tweetindex
            .countDocuments({$or:[{isArchived: false}, {isArchived: {$exists: false}}]})
            .then((id) => {
                return tweetindex.create({
                    content: tweet,
                    yes: [message.author.id],
                    no: [],
                    sort: id,
                });
            })
            .then((tweet) => {
                message.channel.send(
                    `${message.author.username} would like to tweet '${tweet.content}'. Use &vote [yes/no] ${tweet.sort} to vote.`
                );
            })
    })
    .catch((err) => {
        if(err == 'Tweet already exists')
        {
            message.reply("tweet already exists, commie.")
        }
        else message.channel.send("I can't do it.")
    })
}

async function voteAll(message, voteArg) {
    // Checking to see if they actually voted right
    const vote = voteToBool(voteArg);
    const id = message.author.id;
    console.log(vote, voteArg);
    if(vote === null)
    {
        message.reply("that's not how you do that.")
        return;
    }

    try {
        const tweets = await tweetindex.find({$nor: [{yes: id}, {no :id} ], $or:[{isArchived: false}, {isArchived: {$exists: false}}] });

        message.reply(`trying to vote ${voteArg} for ${tweets.length} tweets`);
        // Vote now
        if(vote === true)
        {
            for(let t of tweets)
            {
                t.yes.push(id);
                t.save();
                checkVotes(message, t);
            }
        }
        else if (vote === false)
        {
            for(let t of tweets)
            {
                t.no.push(id);
                t.save();
                checkVotes(message, t);
            }
        }
    }
    catch (err){
        console.log(err);
        message.reply("I can't do it.")
    }
}

async function vote(message, voteArg, tweet)
{
    // Checking to see if they actually voted right
    const vote = voteToBool(voteArg);
    const id = message.author.id;
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
        if(tweet.canTweet && !tweet.isArchived)
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

function voteToBool(arg)
{
    if(yes.includes(arg)) return true;
    if(no.includes(arg)) return false;
    return null;
}

function fixSort() {
    tweetindex.find({}, async function (err, tweets) {
        if (err) {
            console.log(err);
        } else {
            let j = 0;
            for (var i = 0; i < tweets.length; i++) {
                if(tweets[i].isArchived)
                {
                    tweets[i].sort = -1;
                }
                else {
                    tweets[i].sort = j;
                    j++
                }
                tweets[i].save();
            }
        }
    });
}

function archiveTweets(message, tweets)
{
    var archiveableTweets = tweets.filter((t) => (t.canTweet == false && t.isArchived == false));
    if(archiveableTweets.length < 20) return;
    for(var tweet of archiveableTweets)
    {
        tweet.isArchived = true;
        tweet.sort = -1;
        tweet.save();
    }
    fixSort();
    message.channel.send("20 donttweets added to the archive. Use &archive 1 to see archived tweets.")
}

module.exports = {tweetText, vote, voteAll, checkVotes, fixSort, archiveTweets}