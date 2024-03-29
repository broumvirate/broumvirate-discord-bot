const longo = require("mongoose");

let tweetSchema = new longo.Schema({
    content: String,
    yes: Array,
    no: Array,
    sort: Number,
    canTweet: { type: Boolean, default: true },
    isArchived: { type: Boolean, default: false }
})

module.exports = longo.model("tweetIndex", tweetSchema);  


