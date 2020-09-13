const Discord = require('discord.js');
const config = require('../src/config.json');
const prefix = config.prefix;




// HELP MENU EMBED
const ComputronMenu = new Discord.MessageEmbed()
    .setColor('#4C18EB')
    .setTitle('I am Computron!')
    .setDescription('Your answer to everything.')
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: '!help', value: 'Will display my list of services', inline: true},
        { name: '!join', value: 'Computron will join your voice channel', inline: true},
        { name: '!leave', value: 'Computron will leave your voice channel', inline: true}
    )
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: `${prefix}d or ${prefix}dwight`, value: 'Will display a list of Dwight sounds', inline: true},
        { name: `${prefix}m or ${prefix}michael`, value: 'Will display a list of Michael sounds', inline: true},
        { name: `${prefix}a or ${prefix}andy`, value: 'Will display a list of Andy sounds', inline: true},
        { name: `${prefix}j or ${prefix}jim`, value: 'Will display a list of Jim sounds', inline: true},
        { name: `${prefix}p or ${prefix}pam`, value: 'Will display a list of Pam sounds', inline: true},
        { name: `${prefix}k or ${prefix}kevin`, value: 'Will display a list of Kevin sounds', inline: true}
    )


module.exports = ComputronMenu;