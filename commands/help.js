const fs = require("fs");
var requireDir = require("require-dir");
var dir = requireDir("./");

let helpmessage = "";

module.exports.command = (message) => {
    //Splices all help strings from all commands into a contiguous message and sends it.
    //TODO: Make help subsets for when there are enough commands that you might want a subset of them.
    fs.readdir("./commands/", (err, files) => {
        const jsFiles = files.filter((el) => el.split(".")[1] === "js");

        jsFiles.forEach((file) => {
            command = file.split(".")[0];
            if (command != "help" && dir[command].help) {
                helpmessage = helpmessage + dir[command].help + "\n";
            }
        });
        message.channel.send(helpmessage);
    });
};
