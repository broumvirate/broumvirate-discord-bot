const longo = require("mongoose");

let tweetSchema = new longo.Schema({
    content: String,
    yes: Number,
    no: Number,
    voted: Array,
    sort: Number
})

module.exports = longo.model("tweetIndex", tweetSchema);  


