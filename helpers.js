const dayjs = require("dayjs");

const nicknameTags = {
    // Core broumvirate
    ben: "102841355239161856",
    jacob: "186149455907520512",
    alden: "202975165905108992",
    kai: "280712843848974336",
    emerson: "280700923318108160",

    // The miles tier
    miles: "253338192508485633",
    beeeggs: "707081562692517900",
    jack: "335522692805558273",
    sandpaper: "335522692805558273", // same as jack
    johnhenry: "235580828007137281",
}

const bhotmString = () => {
    let distance = dueMoment().diff(dayjs());

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

const isAdmin = (message) => {
    const admins = [nicknameTags.ben, nicknameTags.jacob];
    return admins.includes(message.author.id);
}

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

module.exports = {nicknameTags, isAdmin, bhotmString};
