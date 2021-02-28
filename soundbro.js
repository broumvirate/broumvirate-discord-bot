const fs = require("fs");

module.exports = function (client) {
    let leaveTimer;
    const activityOptions = [
        "with himself",
        "?4 repeatedly",
        "Lost in the Woods",
        "slinkycar",
        "Just sittin' there",
        "Minecraft",
        "the mother of all sax solos",
        "Rock Game"
    ];

    // Set status on bot ready
    client.on("ready", () => {
        console.log("SoundBro ready...");
        client.user.setActivity(
            activityOptions[Math.floor(Math.random() * activityOptions.length)],
            {
                type: "PLAYING",
            }
        );
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

            if (fileNum == "list") {
                getList(message);
            } else {
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
                                        connection.disconnect();
                                    }, 300000);
                                })
                                .catch((err) => console.log(err));
                        }
                    }
                });
            }
        }
    });
};

function getList(message) {
    fs.readdir("sounds", (err, files) => {
        if (err) {
            message.reply("I can't do that.");
        } else {
            const sounds = files
                .filter((el) => el.split(".")[1] == "mp3")
                .map((el) => el.split(".")[0])
                .sort((a, b) => a - b);
            message.channel.send("All SoundBro options:");
            message.channel.send(sounds.join(", "));
        }
    });
}
