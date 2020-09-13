const Discord = require('discord.js');
const fs = require('fs');
const config = require('../src/config.json');
const path = require('path');
const { split } = require('ffmpeg-static');
const prefix = config.prefix;


// HELP MENU EMBED

let Sounds = new Object();

function RetreiveDwightsAudioClips() {
    i = 0;
    const folder = './assets/sounds/dwight';
    fs.readdirSync(folder).forEach(file => {
        let character = file.split("_")[0]
        let name = file.split("_")[1]
        Sounds[i] = { character, name }
        i++;
    });
    console.log(Sounds)
}

RetreiveDwightsAudioClips()

const DwightMenu = new Discord.MessageEmbed()
    .setColor('#4C18EB')
    .setTitle('Dwight Soundboard')
    .setDescription('Use !dwight or !d prefix')
    .setThumbnail('https://media.tenor.com/images/91689fd1055161956850f8e8ecdb9a43/tenor.gif')
    .addFields({ name: '\u200B', value: '\u200B' })


for (i = 0; i < Object.keys(Sounds).length; i++) {
    let character = Sounds[i].character
    let name = Sounds[i].name.split('.')[0]
    DwightMenu.addField(prefix + character, name, true)
}


exports.Sounds = Sounds;
exports.DwightMenu = DwightMenu;
exports.RetreiveDwightsAudioClips = RetreiveDwightsAudioClips;





