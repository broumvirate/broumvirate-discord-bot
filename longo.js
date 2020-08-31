require("dotenv").config();
const longo = require("mongoose");
const requireDir = require("require-dir");
const dir = requireDir("./schema");

longo.connect(process.env.LONGO_TOKEN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

dir.tweetindex.find({}, function (err, tweets) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(tweets);
});
