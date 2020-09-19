const Discord = require('discord.js');
const fs = require('fs');
const config = require('../src/config.json');
const path = require('path');
const { split } = require('ffmpeg-static');
const prefix = config.prefix;


//Instantiates a sounds object to store information about this characters sounds
let Sounds = new Object();


//func. that looks at the character folder and adds an entry to the Sounds obj.
function RetreiveAudioClips() {
    i = 0;
    const folder = './assets/sounds/michael';
    fs.readdirSync(folder).forEach(file => {
        let character = file.split("_")[0]
        let name = file.split("_")[1]
        Sounds[i] = { character, name }
        i++;
    });
}


// Runs above fuction on startup / RS required when need sounds are added
RetreiveAudioClips()


// Creates new character specific menu
const MichaelMenu = new Discord.MessageEmbed()
    .setColor('#4C18EB')
    .setTitle('Dwight Soundboard')
    .setDescription('Use !dwight or !d prefix')
    .setThumbnail('https://thumbs.gfycat.com/NimbleMelodicBubblefish-size_restricted.gif')
    .addFields({ name: '\u200B', value: '\u200B' })
    .addFields({name:'test', value: 'test'})


// Iterates through the Sounds obj. and append a field to the menu for every sound 
for (i = 0; i < Object.keys(Sounds).length; i++) {
    let character = Sounds[i].character
    let name = Sounds[i].name.split('.')[0]
    MichaelMenu.addField(prefix + 'd '+ name, name,true)
}


// Exports menu for use in the main module  
exports.MichaelMenu = MichaelMenu;






