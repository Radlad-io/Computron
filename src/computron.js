require('dotenv').config();
const fs = require('fs');
const path = require('path');
const prefix = process.env.PREFIX;
const { OpusEncoder } = require('@discordjs/opus');
const pathToFfmpeg = require('ffmpeg-static');
const { runInContext } = require('vm');

const Commando = require('discord.js-commando')
const client = new Commando.CommandoClient({
  owner: '221045660458156034'
})


    function PlaySoundOverVoiceChannel(VoiceChannel, Location, Name, Description, Emoji){
        if (fs.existsSync(path.join(__dirname, `../assets/sounds/${Location}/${Location}_${Name}_${Description}_${Emoji}.mp3`))) {
          VoiceChannel.join().then((connection) => {
            connection.play(path.join(__dirname, `../assets/sounds/${Location}/${Location}_${Name}_${Description}_${Emoji}.mp3`))
          })
        } else {
          msg.channel.send('Computron can not find the file you are looking for. Its probably your fault though.')
        }
      }
      
      
      client.on('messageReactionAdd', (msg) => {
        // Keeps audio from playing while bot adds initial reactions
        if( msg.count <= 1 ){
          return
        }

        //Searches through sound object to find sound that matches reaction
        let CurrentBoard = msg.message.embeds[0].title
        let CurrentCharacter = CurrentBoard.split(' ')[0]

        let Sounds = {};

        function RetreiveAudioClips() {
          let i = 0;
          const folder = `./assets/sounds/${CurrentCharacter}`;
          fs.readdirSync(folder).forEach(file => {
              let character = file.split("_")[0]
              let name = file.split("_")[1]
              let description = file.split("_")[2]
              let emoji = file.split("_")[3].split('.')[0]
              Sounds[i] = { character, description, name, emoji }
              i++;
          })
        }
        RetreiveAudioClips() 

        var results = {};
        var options = Sounds;

        for(i=0; i<Object.keys(options).length; i++) {
          for(key in options[i]) {
            if(options[i].emoji === msg.emoji.name) {
              results = options[i];
            }
          }
        }
        // Plays sound
        if(results){
            const VoiceChannel = client.channels.cache.get('509498460748120065')
            PlaySoundOverVoiceChannel(VoiceChannel, results.character, results.name, results.description, results.emoji)
        }
      })




client.login(process.env.COMPUTRON_TOKEN)
client.on('ready', () => {

  client.registry
    .registerGroups([
      ['misc', 'misc commands'],
      ['soundboards','menus']
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, '../cmds'))
    
  console.log(`${client.user.tag} has logged in.`);
});

