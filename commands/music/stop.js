const { Command } = require('discord.js-commando');

module.exports = class stopCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            aliases: [
                'stfu',
                'stahp',
                'disconnect'
            ],
            group: 'music',
            memberName: 'stop',
            description: 'Disconnects mcore from voice connection on the server',
            examples: ['mcore stop', 'mcore stahp', 'mcore disconnect', 'mcore stfu'],
            guildOnly: true
        });
    }

    run(msg, args) {
        const connection = msg.guild.voice ? msg.guild.voice.connection : null;
        const member_channel = msg.member.voice.channel;

        if (!connection) return msg.reply("I'm not even playing music right now!");
        if (!member_channel || member_channel !== connection.channel) return msg.reply("you're not even in the voice channel I'm playing at!");

        connection.dispatcher.end();
    }
};
