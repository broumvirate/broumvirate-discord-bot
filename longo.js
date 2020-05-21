const longo = require('mongoose');
const requireDir = require('require-dir');
const dir = requireDir('./schema');

longo.connect('mongodb+srv://tweetums:6ItDBa3tqfMFfL2Q@broumvirate-com-wvuvq.mongodb.net/tweetums?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

dir.tweetindex.find({}, function (err, tweets) {
    if (err) {
        console.log(err)
        return;
    }
    console.log(tweets);
})

