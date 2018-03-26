const { Command } = require('discord.js-commando');

module.exports = class sayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'talk',
            group: 'other',
            memberName: 'talk',
            description: 'Mcore says the message in the specified server channel',
            examples: ['mcore talk Hi there!'],
            args: [{
                key: 'text',
                prompt: 'What do you want M_CORE to say on the server?',
                type: 'string'
            }]
        });
    }

    run(msg, { text }) {
        if (msg.author.id !== process.env.MAD) return;
        return this.client.guilds.get(process.env.MAD_CHAT)
            .channels.get(process.env.MAD_CHANNEL)
            .send(text);
    }
};
