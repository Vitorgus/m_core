const { Command } = require('discord.js-commando');

module.exports = class sayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'talk',
            group: 'other',
            memberName: 'talk',
            description: 'Mcore says the message in the specified server channel',
            examples: ['mcore talk Hi there!'],
            args: [
                {
                    key: 'channel',
                    prompt: 'Which channel do you want to send the message to?',
                    type: 'string'
                },
                {
                    key: 'text',
                    prompt: 'What do you want M_CORE to say on the server?',
                    type: 'string'
                }

            ]
        });
    }

    run(msg, { channel, text }) {
        if (msg.author.id !== process.env.MAD) return;
        let ch = this.client.guilds.get(process.env.MAD_CHAT)
            .channels.get(channel);
        if (!ch) return msg.say(`Coudn't find channel ${channel} in the server!`)
            return ch.send(text);
    }
};
