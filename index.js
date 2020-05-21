require("dotenv").config()
const Discord = require("discord.js")
const client = new Discord.Client()
const Twitter = require("twitter-lite")
const fs = require("fs")
const longo = require('mongoose')
const longojs = require('./longo.js')

//Process files in events folder as event handlers.
fs.readdir("./events/", (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`)
    const eventName = file.split(".")[0]
    client.on(eventName, arg => eventHandler(client, arg))
  })
})

client.login(process.env.BOT_TOKEN)
