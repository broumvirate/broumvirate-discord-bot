const mongoose = require("mongoose");

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
