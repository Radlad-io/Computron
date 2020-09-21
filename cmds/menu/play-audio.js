const Commando = require('discord.js-commando')
// const { sup } = require('ffmpeg-static')
const path = require('path');

module.exports = class PlayAudioCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'playaudio',
            group: 'misc',
            memberName: 'playaudio',
            description: 'plays audio over voice channel'
        })
    }

    async run(message) {
        const { voice } = message.member

        if(!voice.channelID){
            message.reply('You need to be in a voice channel')
            return
        }

        voice.channel.join().then((connection) => {
            connection.play(path.join(__dirname, '../../assets/sounds/help/help_computron_🤔.mp3'))
        })

    }



      
}