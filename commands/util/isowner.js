const { Command } = require('discord.js-commando');

module.exports = class isownerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'isowner',
            group: 'util',
            memberName: 'isowner',
            description: 'debug function to verify if the user is the owner of the bot',
            examples: ['mcore isowner'],
        });
    }

    run(msg) {
        if (!this.client.online) return;
        var bool = this.client.isOwner(msg.author);
        if (bool)
            return msg.say("Hello, Vitorgus! You are my owner!");
        else
            return msg.say("Sorry, but you are not my owner.");
    }
};
