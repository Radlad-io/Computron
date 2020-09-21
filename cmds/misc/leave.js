const Commando = require('discord.js-commando')
const Discord = require('discord.js');

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { split } = require('ffmpeg-static');
const prefix = process.env.prefix;

module.exports = class EmbedCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'leave',
            group: 'misc',
            memberName: 'misc',
            description: 'Disconnects bot from channel'
        })
    }
    async run(message) {
        message.member.voice.channel.leave();
    }
}