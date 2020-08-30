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

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
});

client.on('message', (msg) => {
    if (msg.content === `${prefix}help`) {
      msg.reply(HelpMenu);
    }
  });

  client.on('message', (msg) => {
    if (msg.content === `${prefix}help dwight` || msg.content === `${prefix}dwight`) {
      msg.reply(Dwight);
    }
  });


const HelpMenu = new Discord.MessageEmbed()
	.setColor('#4C18EB')
  .setTitle('I am Computron!')
  .setDescription('Your answer to everything.')
	.addFields(
		{ name: '\u200B', value: '\u200B' },
        { name: '!help', value: 'Will display my list of services'},
        { name: '!join', value: 'Computron will join your voice channel'}
    )
  .setTimestamp()

const Dwight = new Discord.MessageEmbed()
	.setColor('#4C18EB')
  .setTitle('Dwight Soundboard')
  .setDescription('Use !dwight or !d prefix')
  .setThumbnail('https://media.tenor.com/images/91689fd1055161956850f8e8ecdb9a43/tenor.gif')
	.addFields(
		{ name: '\u200B', value: '\u200B' },
        { name: `${prefix}d deputy`, value: 'I did not become a sherifs deputy...', inline: true},
        { name: '!d fast', value: 'somewhere between a snake and a mongose.', inline: true},
        { name: '!d fighter', value: 'I come from a long line of fighters.', inline: true},
        { name: '!d hurt', value: 'Its better to be hurt by someone you know', inline: true},
        { name: '!d idiot', value: 'I think would and idot do that...', inline: true},
        { name: '!d ipod', value: 'Is that a prisonduro sport. Its like an ipod only better...', inline: true},
        { name: '!d loyal', value: 'Look, Im all about loyalty.', inline: true},
        { name: '!d pan', value: 'Ok. See you later Pan.', inline: true},
        { name: '!d security', value: 'Security in this office park is a joke.', inline: true},
        { name: '!d sex', value: 'Goat on chicken, chicken on goat...', inline: true},
        { name: '!d weed', value: 'Lets go over they symptoms of marijuana', inline: true},
        { name: '!d wig', value: 'I have a wig for every single person in the office', inline: true}
    )
  
  client.on('message', async msg => {
    // Join the same voice channel of the author of the message
    if (msg.content === `${prefix}join` &&  msg.member.voice.channel) {
      const connection = await msg.member.voice.channel.join();
    }else{
      return;
    }
  });

  client.on('message', async msg => {
    // Join the same voice channel of the author of the message
    if (msg.content === `${prefix}leave` &&  msg.member.voice.channel) {
      const connection = await msg.member.voice.channel.leave();
    }else{
      return;
    }
  });

  client.on('message', async (msg) => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    if (msg.content.startsWith(`${prefix}d`)) {
      if(msg.content === `${prefix}dwight`) return;
      if(!msg.member.voice.channelID){
        msg.channel.send('You need to be in a voice channel')
        return
      }
      const SoundName = msg.content.split(" ")
      console.log(SoundName[1])
      if (fs.existsSync(path.join(__dirname, `../assets/sounds/dwight/dwight_${SoundName[1]}.mp3`))){
        msg.member.voice.channel.join().then((connection) => {
          connection.play(path.join(__dirname, `../assets/sounds/dwight/dwight_${SoundName[1]}.mp3`))
        })
      }else{
        msg.channel.send('Computron can not find the file you are looking for. Its probably your fault though.')
      }
    }
  });




  client.on('message', (msg) => {
    if(msg.content === `${prefix}kill`){
      dispatcher.destroy();
    }
  })


client.login(process.env.COMPUTRON_TOKEN);
