const fs = require("fs");

module.exports = function (client) {
    let leaveTimer;

    // Set status on bot ready
    client.on("ready", () => {
        console.log("SoundBro ready...");
        client.user.setActivity("Just sittin' there", {
            type: "PLAYING",
        });
    });

    client.on("message", (message) => {
        if (message.content.startsWith("?")) {
            // Determine requested file
            let fileNum = Array.from(message.content);
            fileNum.shift();
            fileNum = fileNum.join("");
            if (!fileNum) {
                message.reply(
                    "gotta put a number after that there question mark."
                );
                return;
            }

            // Attempt to load file
            fs.access(`sounds/${fileNum}.mp3`, (err) => {
                if (err) {
                    message.reply(
                        `fuck off. ${fileNum} is not a valid sound file.`
                    );
                } else {
                    // Join voice channel, play sound file
                    if (message.member.voice.channel) {
                        message.member.voice.channel
                            .join()
                            .then((connection) => {
                                connection.play(`sounds/${fileNum}.mp3`);

                                // Start five minute timer to leave the channel
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
