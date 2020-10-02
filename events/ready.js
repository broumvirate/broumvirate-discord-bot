module.exports = (client) => {
    console.log("Tweetums ready...");
    client.user.setActivity("&help", {
        type: "STREAMING",
    });
};
