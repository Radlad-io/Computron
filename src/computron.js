require('dotenv').config();

const fs = require('fs');
const config = require('./config.json');
const path = require('path');
const prefix = config.prefix;
const { OpusEncoder } = require('@discordjs/opus');
const pathToFfmpeg = require('ffmpeg-static');
const Discord = require('discord.js');
const { runInContext } = require('vm');
const client = new Discord.Client();

const ComputronMenu = require('../menus/help');
const Dwight = require('../menus/dwight_menu');



//DYNAMIC COMMAND MODULE IMPORT
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  client.commands.set(command.name, command);
  console.log(`Added ${file}`)
}


// HELP MENU FUNCTION
client.on('message', (msg) => {
  if (msg.content === `${prefix}help`) {
    msg.reply(ComputronMenu);
  }
});




// Dwight
client.on('message', (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot){
    return
  }else if (msg.content === `${prefix}d` || msg.content === `${prefix}dwight`) {
    msg.reply(Dwight.DwightMenu)
    .then((sentMessage) => {
      Object.values(Dwight.DwightButtons).forEach(val => {
        sentMessage.react(val)
      })
    })
    return
  }else if(!msg.member.voice.channelID){
    msg.channel.send('You need to be in a voice channel')
    return
  }else if (msg.content.startsWith(`${prefix}d`) || msg.content.startsWith(`${prefix}dwight`)) {
    let Location = 'dwight';
    let Name = msg.content.split(" ")[1]
    playSoundOverVoiceChannel(msg, Location, Name)
  }
});




function playSoundOverVoiceChannel(msg, Location, Name){
  if (fs.existsSync(path.join(__dirname, `../assets/sounds/${Location}/${Location}_${Name}.mp3`))) {
    msg.member.voice.channel.join().then((connection) => {
      connection.play(path.join(__dirname, `../assets/sounds/${Location}/${Location}_${Name}.mp3`))
    })
  } else {
    msg.channel.send('Computron can not find the file you are looking for. Its probably your fault though.')
  }
  console.log(msg.member.voice.channel.id)
}



//!LEAVE - ADD COMPUTRON TO DISCORD CHANNEL
client.on('message', async msg => {
  // Join the same voice channel of the author of the message
  if (msg.content === `${prefix}join` &&  msg.member.voice.channel) {
    const connection = await msg.member.voice.channel.join();
    console.log(msg.member.voice.channel)
  }else{
    return;
  }
});

//!JOIN - REMOVE COMPUTRON FROM DISCORD CHANNEL
client.on('message', async msg => {
  if (msg.content === `${prefix}leave` &&  msg.member.voice.channel) {
    const connection = await msg.member.voice.channel.leave();
  }else{
    return;
  }
});





// COMMAND LINE FEEDBACK FOR LOGIN
client.on('ready', () => {
  console.log(`${client.user.tag} has logged in.`);
});

client.login(process.env.COMPUTRON_TOKEN);



// API
client.on('messageReactionAdd', (msg) => {
  console.log('-- 🐤')
  if( msg.count <= 1 ){
    return
  }
  var results = [];
  var options = Dwight.DwightButtons;
  var toSearch = msg._emoji.name;
  for(var i=0; i<options; i++) {
    for(key in options[i]) {
      if(options[i][key].indexOf(toSearch)!=-1) {
        results.push(options[i]);
      }
    }
  }
  console.log(results)
  if(results){
    // console.log(msg._emoji.name)
    let location = Dwight.Sounds[results];
    console.log(location);
    let clip = Dwight.Sounds;
    console.log(location);
    const voiceChannel = client.channels.cache.get('384139844907040772')
    voiceChannel.join().then((connection) => {
    connection.play(path.join(__dirname, `../assets/sounds/dwight/dwight_hurt.mp3`))
  })
  }
})

