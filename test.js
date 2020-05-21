let mongoose = require("mongoose")

mongoose.connect('mongodb+srv://tweetums:6ItDBa3tqfMFfL2Q@broumvirate-com-wvuvq.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

let tweetSchema = new mongoose.Schema({
    content: String,
    yes: Number,
    no: Number,
    voted: Array,
    id: Number
})

let Tweet = mongoose.model("tweetIndex", tweetSchema);

Tweet.find({}, function(err, tweets){
    console.log(tweets);
})