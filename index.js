const path = require('path');                       //Gets the system path
const Commando = require('discord.js-commando');    //Gets the commando library
const token = process.env.TOKEN;       //Gets the SUPER SECRET BOT TOKEN from the hosting enviroment
const Enmap = require('enmap');                     //Gets the enmap. Basically a simple database
const reply = require('./msg_reply.json');
const r_reply = require('./random_reply.json');

//Initializing bot
const bot = new Commando.Client({
    owner: '291235973717688321',    // Setting myself as the owner. That's my Discord ID.
    commandPrefix: 'mcore ',       // Setting the prefix
    disableEveryone: true,          // Allows the bot to use @everyone and @here
    unknownCommandResponse: false   // Disable the default unknown command response, So that it can reply with a random custom emoji later on the code
});

/*
Code that will be executed when the bot is initialized.
It mostly just set some things and logs that the bot is online
*/
bot.on('ready', () => {
    package = require('./package.json');                                // Gets the package.json file
    console.log(`Starting ${package.name} v${package.version}...`);     // Outputs in the log that the bot has started
    bot.user.setStatus("online");                                       // Sets bot status
    //bot.user.setGame("JARVIS | jarvis help");
    bot.music = {};
    bot.timed_function = null;
    bot.random_reply = false;
    console.log("Logged in!");
});

bot.on('unknownCommand', message => {
    if (message.guild && message.guild.available && message.guild.emojis.size){
        emoji = message.guild.emojis.random();      // Gets a random custom emoji
        message.say(emoji.toString());              // Says the emoji in the chat
    }
    /* THIS CODE IS JUST HERE TO REMIND ME THAT THE FOLOWING IS POSSIBLE
    // Send an emoji:
    const emoji = guild.emojis.first();
    msg.reply(`Hello! ${emoji}`);
    */
});

bot.on('message', message => {
    /* THIS CODE IS JUST HERE TO REMIND ME THAT THE FOLOWING IS POSSIBLE
    if (message.content == "alo") {
        message.channel.send("<@291235973717688321><:red:362768065202618369>");
    }*/
    if (message.author.bot) return;

    if (!bot.random_reply) {
        bot.random_reply = true;
        console.log("Started replying!");
        setRandomReply(message);
    }
    if (bot.timed_function) clearTimeout(bot.timed_function);
    bot.timed_function = setTimeout(noReply, 600000); //600000
    console.log("Cooldown refreshed!");

    if (message.content.startsWith(bot.commandPrefix)) return;

    if (Math.random() <= 0.5) {
        message.channel.send(reply[Math.floor(Math.random() * reply.length)]);
    }
});

function setRandomReply(msg) {
    let rand = Math.trunc((Math.random() * 300000) + 120000);
    setTimeout(randomReply.bind(null, msg), rand);
    console.log("Random reply in " + rand + " milissecs!");
}

function randomReply(msg) {
    if (!bot.random_reply) {
        console.log("Reply blocked!");
        return;
    }
    console.log("Just replied!");
    msg.channel.send(r_reply[Math.floor(Math.random() * r_reply.length)]);
    setRandomReply(msg);
}

function noReply() {
    bot.random_reply = false;
    bot.timed_function = null;
    console.log("No more replies!");
}

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

process.on('unhandledRejection', console.error);    // ...I guess this line is important, but I don't know why

// Registers the commands for the bot and divide them in their categories
bot.registry
    .registerDefaultTypes()
    .registerGroups([
        ['music', 'Music Commands'],
        ['polls', 'Poll Commands'],
        ['fun', 'Fun Commands'],
        ['search', 'Search Commands'],
        ['util', 'Utility Commands'],
        ['other', 'Other Useful Commands']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

//Login into discord. WHy is this line in the bottom of the code?
bot.login(token);

/*
PS: removed erlpack from package.json, but just in case the bot crashes, here it is
    "erlpack": "github:hammerandchisel/erlpack",
*/
