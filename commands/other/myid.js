const { Command } = require('discord.js-commando');

module.exports = class myidCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'myid',
            group: 'other',
            memberName: 'myid',
            description: 'returns the user id of the sender',
            examples: [';myid']
        });
    }

    run(msg, args) {
        if (!bot.online) return;
        return msg.say(msg.author.id);
    }
};
