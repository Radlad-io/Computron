const Discord = require('discord.js');
const fs = require('fs');
const config = require('../src/config.json');
const path = require('path');
const { split } = require('ffmpeg-static');
const prefix = config.prefix;


//Instantiates a sounds object to store information about this characters sounds
let Sounds = new Object();
let DwightButtons = {
    0: '🥉',
    1: '😭',
    2: '🥳',
    3: '😖',
    4: '🤪',
    5: '🧝',
    6: '🐕',
    7: '😏',
    8: '🔪',
    9: '🍳',
    10: '🥒',
    11: '🍆',
    12: '🐤',
}


//func. that looks at the character folder and adds an entry to the Sounds obj.
function RetreiveDwightsAudioClips() {
    i = 0;
    const folder = './assets/sounds/dwight';
    fs.readdirSync(folder).forEach(file => {
        let character = file.split("_")[0]
        let name = file.split("_")[1]
        Sounds[i] = { character, name }
        i++;
    });
}


// Runs above fuction on startup / RS required when need sounds are added
RetreiveDwightsAudioClips()


// Creates new character specific menu
const DwightMenu = new Discord.MessageEmbed()
    .setColor('#4C18EB')
    .setTitle('Dwight Soundboard')
    .setDescription('Use !dwight or !d prefix')
    .setThumbnail('https://media.tenor.com/images/91689fd1055161956850f8e8ecdb9a43/tenor.gif')
    .addFields({ name: '\u200B', value: '\u200B' })

// Iterates through the Sounds obj. and append a field to the menu for every sound 
for (i = 0; i < Object.keys(Sounds).length; i++) {
    let character = Sounds[i].character
    let name = Sounds[i].name.split('.')[0]
    DwightMenu.addField(DwightButtons[i] + " " + name , name,true)
}



// Exports menu for use in the main module
exports.Sounds = Sounds;  
exports.DwightButtons = DwightButtons;
exports.DwightMenu = DwightMenu;
exports.RetreiveDwightsAudioClips = RetreiveDwightsAudioClips;





