const helpers = require("../helpers.js");

module.exports.help =
    "**&nick** Changes someone's nickname. Usage: &nick Emerson Phlegmerson";

module.exports.command = (message, args) => {
    if (args.length < 2) {
        message.reply("that don't work, buddy");
        return;
    }

    if (Object.keys(helpers.nicknameTags).includes(args[0])) {
        // Do the nickname change
        const changeId = helpers.nicknameTags[args[0]];
        const nickname = args.slice(1).join(" ");
        message.guild.members
            .fetch(changeId)
            .then((member) => {
                return member.setNickname(nickname);
            })
            .catch((err) => {
                message.reply(
                    "physically unable to change nickname. <:bencry:697944953879527464>"
                );
                console.log(err);
            });
    } else {
        message.reply(`ain't nobody called ${args[0]}. Get outta here!`);
    }
    return;
};
