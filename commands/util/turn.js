const { Command } = require('discord.js-commando');

module.exports = class sayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'turn',
            group: 'util',
            memberName: 'talk',
            description: 'Toggles mcore on/off',
            examples: ['mcore turn on', 'mcore turn off'],
            args: [{
                key: 'state',
                prompt: 'Do you want to turn MCORE on or off?',
                type: 'string'
            }]
        });
    }

    run(msg, { state }) {
        if (msg.author.id !== process.env.MAD) return;
        if (state === "on") {
            if (this.client.status === true)
                return msg.say("But I'm already turned on 😏");
            this.client.status = true;
            this.client.user.setStatus("online");
            return msg.say("I'm now online!");
        }
        if (state === "off") {
            if (this.client.status === false)
                return msg.say("Dude... I'm already offline...");
            this.client.status = false;
            this.client.user.setStatus("idle");
            return msg.say("I'm now offline!");
        }
        else return msg.say("Sorry, but I didn't get it if it was on or off.");
    }
};
