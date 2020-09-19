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
      Object.values(Dwight.Sounds).forEach(val => {
        sentMessage.react(val.emoji)
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




client.on('messageReactionAdd', (msg) => {

  // Keeps audio from playing while bot adds initial reactions
  if( msg.count <= 1 ){
    return
  }

  // Searches through sound object to find sound that matches reaction
  var results = {};
  var options = Dwight.Sounds;

  for(i=0; i<Object.keys(options).length; i++) {
    for(key in options[i]) {
      if(options[i].emoji === msg.emoji.name) {
        results = options[i];
      }
    }
  }

  // Plays sound
  if(results){
    const voiceChannel = client.channels.cache.get('384139844907040772')
    voiceChannel.join().then((connection) => {
    connection.play(path.join(__dirname, `../assets/sounds/${results.character}/${results.character}_${results.name}`))
  })
  }

})




client.login(process.env.COMPUTRON_TOKEN)
.then(() =>{
  client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
  });
})

