const path = require('path');                       //Gets the system path
const Commando = require('discord.js-commando');    //Gets the commando library
const token = process.env.TOKEN;       //Gets the SUPER SECRET BOT TOKEN from the hosting enviroment
const replies = require('./replies.json');
const n_reply = replies.default; //require('./msg_reply.json');
const r_reply = replies.random; //require('./random_reply.json');
const get_it = replies.get_it; //require('./get_it.json');
const love = replies.love_you; //require('./love.json');

// HTTP port so it doesn't sleep
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
// END

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
    let pkg = require('./package.json');                                // Gets the package.json file
    console.log(`Starting ${pkg.name} v${pkg.version}...`);     // Outputs in the log that the bot has started
    bot.user.setStatus("idle");                                       // Sets bot status
    bot.music = {};
    bot.reply = {};
    bot.online = false;
    console.log("Logged in!");
});

bot.on('unknownCommand', message => {
    if (!bot.online) return;
    if (message.guild && message.guild.available && message.guild.emojis.size){
        emoji = message.guild.emojis.random();      // Gets a random custom emoji
        message.say(emoji.toString());              // Says the emoji in the chat
    }
});

bot.on('message', message => {
    if (!bot.online || !message.guild || message.guild.id === process.env.TEST_CHAT) return;

    if (!bot.reply[message.guild.id])
        bot.reply[message.guild.id] = {
            timed_function: null,
            random_reply: false
        };

    if (message.author.bot) return;
    
    let reply = bot.reply[message.guild.id];

    if (!reply.random_reply) {
        reply.random_reply = true;
        console.log("Started replying!");
        setRandomReply(message);
    }
    if (reply.timed_function) clearTimeout(reply.timed_function);
    reply.timed_function = setTimeout(noReply.bind(null, message.guild.id), 600000);
    console.log("Cooldown refreshed!");

    if (message.content.startsWith(bot.commandPrefix)) return;

    if (/you get it/gi.test(message.content)) {
        return message.channel.send(get_it[Math.floor(Math.random() * get_it.length)]);
        console.log("I got it!");
    }
    if (/I love you/gi.test(message.content)) {
        return message.channel.send(love[Math.floor(Math.random() * love.length)]);
        console.log("Sending love!");
    }
    if (Math.random() <= 0.5) {
        return message.channel.send(reply[Math.floor(Math.random() * n_reply.length)]);
        console.log("Said something!");
    }
});

function setRandomReply(msg) {
    let rand = Math.trunc((Math.random() * 300000) + 120000);
    setTimeout(randomReply.bind(null, msg), rand);
    console.log("Random message in " + rand + " milissecs!");
}

function randomReply(msg) {
    if (!bot.reply[msg.guild.id].random_reply) {
        console.log("Message blocked!");
        return;
    }
    msg.channel.send(r_reply[Math.floor(Math.random() * r_reply.length)]);
    console.log("Just said something random!");
    setRandomReply(msg);
}

function noReply(id) {
    bot.reply[id].random_reply = false;
    bot.reply[id].timed_function = null;
    console.log("No more randomness!");
}

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
