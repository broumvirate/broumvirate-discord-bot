const helpers = require("../helpers.js");

module.exports.help =
    "**&nick [user] [new nickname]** Changes someone's nickname. Example: &nick Alden Big Meme-a";

module.exports.command = (message, args) => {
    if (args.length < 2) {
        message.reply("that don't work, buddy");
        return;
    }

    const desiredUser = args[0].toLowerCase();
    const nickname = args.slice(1).join(" ");

    if (Object.keys(helpers.nicknameTags).includes(desiredUser)) {
        // If we have a saved name for this user in the helper file, change their nickname
        const changeId = helpers.nicknameTags[desiredUser];
        changeNickname(changeId, desiredUser, nickname, message);
    } else {
        // Else, do a search on the username
        message.guild.members
            .fetch({ query: args[0], limit: 1 })
            .then((members) => {
                if (members.size == 0) {
                    throw new Error();
                }
                
                members.forEach((member) => {
                    changeNickname(
                        member.user.id,
                        desiredUser,
                        nickname,
                        message
                    );
                    message.reply(`user not in list, changed nickname anyway.`);
                });
            })
            .catch(() => {
                message.reply(
                    `ain't nobody here called ${args[0]}. Get outta here!`
                );
            });
    }
    return;
};

function changeNickname(userId, desiredUser, nickname, message) {
    message.guild.members
        .fetch(userId)
        .then((member) => {
            if (desiredUser === "ben") {
                member.user.send(
                    `Please change your nickname to: "${nickname}"`
                );
                message.reply("PM sent to Ben to request nickname change.");
                return;
            }
            return member.setNickname(nickname);
        })
        .catch((err) => {
            message.reply(
                "physically unable to change nickname. <:bencry:697944953879527464>"
            );
            console.log(err);
        });
}
