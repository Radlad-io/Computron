require('dotenv').config();
const Discord = require('discord.js');
const prefix = process.env.prefix;




// HELP MENU EMBED
const HelpMenu = new Discord.MessageEmbed()
    .setColor('#4C18EB')
    .setTitle('I am Computron!')
    .setDescription('Your answer to everything.')
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: '\`\`\`!help`\`\`', value: 'Will display my list of services', inline: true},
        { name: '\`\`\`!clean\`\`\`', value: 'Computron will clean old soundboards from chat', inline: true},
        { name: '\`\`\`!leave\`\`\`', value: 'Computron will leave your voice channel', inline: true}
    )
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: `\`\`\`${prefix}d or ${prefix}dwight\`\`\``, value: 'Will display a list of Dwight sounds', inline: true},
        { name: `\`\`\`${prefix}m or ${prefix}michael\`\`\``, value: 'Will display a list of Michael sounds', inline: true},
        { name: `\`\`\`${prefix}a or ${prefix}andy\`\`\``, value: 'Will display a list of Andy sounds', inline: true},
        { name: `\`\`\`${prefix}j or ${prefix}jim\`\`\``, value: 'Will display a list of Jim sounds', inline: true},
        { name: `\`\`\`${prefix}p or ${prefix}pam\`\`\``, value: 'Will display a list of Pam sounds', inline: true},
        { name: `\`\`\`${prefix}c or ${prefix}creed\`\`\``, value: 'Will display a list of Dwight sounds', inline: true},
        { name: `\`\`\`${prefix}da or ${prefix}darrly\`\`\``, value: 'Will display a list of Michael sounds', inline: true},
        { name: `\`\`\`${prefix}k or ${prefix}kevin\`\`\``, value: 'Will display a list of Andy sounds', inline: true},
        { name: `\`\`\`${prefix}ke or ${prefix}kelly\`\`\``, value: 'Will display a list of Jim sounds', inline: true},
        { name: `\`\`\`${prefix}l or ${prefix}loser\`\`\``, value: 'Will display a list of Toby sounds', inline: true},
        { name: `\`\`\`${prefix}e or ${prefix}erin\`\`\``, value: 'Will display a list of Kevin sounds', inline: true}
    )


module.exports = HelpMenu;