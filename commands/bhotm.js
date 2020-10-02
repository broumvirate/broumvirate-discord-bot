const Discord = require("discord.js");
const dayjs = require("dayjs");

module.exports.help = "**&bhotm:** Reminds you when BHotM is due.";

module.exports.command = async (message) => {
    let distance = dueMoment().diff(dayjs());

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    message.channel.send(
        `BHotM submissions due in: ${days}d ${hours}h ${minutes}m ${seconds}s `
    );
};

// Function copied over from broumvirate.com codebase
function dueMoment(incJ) {
    //Returns next due date moment
    //Params: incJ:boolean. include judging period. If true, due date doesn't roll over until the 8th. if false or empty, rolls over on 5th.
    let day = 4;
    let dueDate;

    if (incJ) {
        day = 7;
    }
    if (dayjs().date() > day) {
        //if it's after the 4th, add a month and set submission time
        dueDate = dayjs().add(1, "M").date(5).startOf("day");
    } else {
        //if it's before the 4th, its this month
        dueDate = dayjs().date(5).startOf("day");
    }
    return dueDate;
}
