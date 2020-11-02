const Discord = require("discord.js"),
    mongoose = require("mongoose"),
    dotEnv = require("dotenv"),
    helpers = require("./helpers"),
    otherHelpers = require("../helpers"),
    dayjs = require("dayjs"),
    advancedFormat = require("dayjs/plugin/advancedFormat");

const client = new Discord.Client();

dayjs.extend(advancedFormat);

dotEnv.config({ path: "../.env" });
mongoose.connect(process.env.LONGO_TOKEN2, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let discordMessages = []; // Contains: messages pulled directly from discord
let nickEntries = []; // Contains:

client.once("ready", () => {
    if (dayjs().date() > 0 && dayjs().date() < 4) {
        client.channels.cache
            .get("689857306321485880")
            .send(
                `AUTOMATED REMINDER: BHotM Submissions due in ${otherHelpers.bhotmString()}`
            );
    }
    client.channels
        .fetch("699995522718630020")
        .then((channel) =>
            channel.messages.fetch({ limit: 50 }).then((messages) => {
                messages.forEach((msg) => {
                    discordMessages.push(msg.embeds);
                });
            })
        )
        .then(() => {
            processNicks(discordMessages);
        })
        .catch((err) => {
            console.log(err);
        });
});

client.login(process.env.TWEETUMS_TOKEN);

function processNicks(mges) {
    if (mges.length == 0) {
        console.log("No new nicknames");
        process.exit(0);
    }

    mges.sort((a, b) => ((a[0].timestamp, b[0].timestamp) ? -1 : 1)); // Sort messages by timestamp

    // Filter down to just today's nickname changes.
    let currentMges = mges.filter((mg) => {
        return dayjs(mg[0].timestamp).isAfter(dayjs().subtract(1, "day"));
    });

    let idList = []; // List of discord IDs we've had, if we have two ids in one day we need a new entry
    let entry = {
        date: Date.now(),
        nicknames: [],
        dateString: dayjs(currentMges[0].timestamp).format("MMMM Do, YYYY"),
    }; // Initial entry format

    currentMges.forEach((mg, i) => {
        let discordTag = mg[0].author.name.split("#")[1]; // Grab the 4-digit discord tag from the user
        if (Object.keys(helpers.discordTags).includes(discordTag)) {
            // If that user is in the discordTags:boys list, it is valid. Proceed.

            let boyId = helpers.discordTags[discordTag]; // Grab the boyId and the nickname
            let thisNickname = mg[0].fields[1].value.slice(1, -1);

            if (idList.includes(boyId)) {
                // If we've already had that boy, push the entry to the finished entry list and reset it
                nickEntries.push(entry); // This code makes sure there are new entries if a boy comes up twice
                entry = {
                    date: dayjs().add(i, "s").format(),
                    nicknames: [],
                    dateString: dayjs(mg.timestamp).format("MMMM Do, YYYY"),
                };
                idList = [];
            }

            idList.push(boyId); // Now, add this boy's ID to the list so we know when it comes up again
            entry.nicknames.push({
                // Add the boy/nick pair to the entry list
                boy: boyId,
                nickname: thisNickname,
            });
        }
    });
    nickEntries.push(entry); // We're out of the loop, push the last entry to the nick entries list
    console.log(dayjs().format());
    if (nickEntries[0].nicknames.length > 0) {
        //Make sure there's at least one nickname change, and insert into database
        helpers.Nick.insertMany(nickEntries, function (err, newNicks) {
            if (err) {
                console.log(err);
            } else {
                console.log(nickEntries);
            }
            process.exit(0);
        });
    } else {
        console.log("No new nicknames");
        process.exit(0);
    }
}
