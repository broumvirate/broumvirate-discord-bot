const Discord = require("discord.js");
const moment = require("moment");

module.exports.help = "**&bhotm:** Reminds you when BHotM is due.";

module.exports.command = async (message) => {
    let distance = dueMoment().diff(moment());

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    message.channel.send(
        "BHotM submissions due in: " +
            days +
            "d " +
            hours +
            "h " +
            minutes +
            "m " +
            seconds +
            "s "
    );
};

// Function copied over from broumvirate.com codebase
function dueMoment(incJ) {
    //Returns next due date moment
    //Params: incJ:boolean. include judging period. If true, due date doesn't roll over until the 8th. if false or empty, rolls over on 5th.
    let day = 4;
    dueDate = moment();

    if (incJ) {
        day = 7;
    }
    if (moment().get("date") > day) {
        //if it's after the 4th, add a month and set submission time
        dueDate.add(1, "M").date(5).startOf("day");
    } else {
        //if it's before the 4th, its this month
        dueDate.date(5).startOf("day");
    }
    return dueDate;
}
