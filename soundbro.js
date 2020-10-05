const fs = require("fs");

module.exports = function (client) {
    let leaveTimer;

    client.on("ready", () => {
        console.log("SoundBro ready...");
        client.user.setActivity("Just sittin' there", {
            type: "PLAYING",
        });
    });

    client.on("message", (message) => {
        if (message.content.startsWith("?")) {
            let fileNum = Array.from(message.content);
            fileNum.shift();
            fileNum = fileNum.join("");
            if (!fileNum) {
                message.reply(
                    "gotta put a number after that there question mark."
                );
                return;
            }
            fs.access(`sounds/${fileNum}.mp3`, (err) => {
                if (err) {
                    message.reply(
                        `fuck off. ${fileNum} is not a valid sound file.`
                    );
                } else {
                    if (message.member.voice.channel) {
                        message.member.voice.channel
                            .join()
                            .then((connection) => {
                                connection.play(`sounds/${fileNum}.mp3`);

                                clearTimeout(leaveTimer);
                                leaveTimer = setTimeout(() => {
                                    message.channel.send("Bye bye!");
                                    connection.disconnect();
                                }, 300000);
                            })
                            .catch((err) => console.log(err));
                    }
                }
            });
        }
    });
};