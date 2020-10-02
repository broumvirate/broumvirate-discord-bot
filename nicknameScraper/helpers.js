const mongoose = require("mongoose");
const dayjs = require("dayjs");

let boySchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: String,
    bid: Number,
    active: Boolean, //DELETE ME
    registered: Boolean, //DELETE ME
    nickOrder: Number, //order in which you're shown on nickname page
    discordTag: String,
    flags: {
        isUser: Boolean, //is a user - ie. able to have a user account
        coreBm: Boolean, //is core broumvirate member
        registered: Boolean, //is member registered
        canRate: Boolean, //allowed to have rating data entered
        hasNicks: Boolean, //nicknames are shown on nickname table
        likesFrog: Boolean, //does this man like frog?
        isAdmin: Boolean,
    },
});

module.exports.Boy = mongoose.model("boy", boySchema);

let nickSchema = new mongoose.Schema({
    date: Date,
    dateString: String,
    editedBy: String,
    notes: String,
    nicknames: [
        {
            nickname: String,
            boy: { type: mongoose.Schema.Types.ObjectId, ref: "boy" },
        },
    ],
});

module.exports.Nick = mongoose.model("nick", nickSchema);

module.exports.discordTags = {
    4172: "5dfa4993ae42c901a49dc6e8", //Ben
    4269: "5dfa4993ae42c901a49dc6ea", //Jacob
    3529: "5dfa4993ae42c901a49dc6e9", //Alden
    4380: "5dfa4993ae42c901a49dc6ec", //Kai
    5591: "5dfa4993ae42c901a49dc6eb", //Emerson
    8067: "5dfa4993ae42c901a49dc6ee", //Miles
};

module.exports.bhotmString = function () {
    let distance = dueMoment().diff(dayjs());

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
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
