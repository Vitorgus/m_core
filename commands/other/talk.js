const { Command } = require('discord.js-commando');

module.exports = class sayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'talk',
            group: 'other',
            memberName: 'talk',
            description: 'Mcore says the message in the specified server channel',
            examples: ['mcore talk main-chat Hi there!'],
            args: [
                {
                    key: 'text',
                    prompt: 'Wich server?/Wich channel?/What to say?',
                    type: 'string'
                }

            ]
        });
    }

    run(msg, { text }) {
        if (!this.client.online || (msg.author.id !== process.env.MAD && !this.client.isOwner(msg.author))) return;
        let list = text.split('/');
        console.log(list);
        if (list.length != 3) return msg.say("There's something wrong. Make sure that the command argument is in the format guild/channel/text");
        for (let i in list) {
            list[i] = list[i].replace(/(^\s+|\s+$)/g,'');
        }
        console.log(list);
        let guild = this.client.guilds.get(list[0]);
        if (!guild) return msg.say(`Could not find specified guild \´${guild}\´`);
        let ch = guild.channels.get(list[1]);
        if (!ch) return msg.say(`Coudn't find channel speficied channel \´${ch}\´ in the guild \´${guild}\´`);
        return ch.send(list[2]);
    }
};
