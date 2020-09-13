/////////////////////

// DWIGHT COMMANDS //

/////////////////////


const fs = require('fs');
const path = require('path');
const config = require('../src/config.json');
const prefix = config.prefix;
const { OpusEncoder } = require('@discordjs/opus');
const pathToFfmpeg = require('ffmpeg-static');

module.exports = {
	name: 'Dwight',
	description: 'Dwight soundboard',
	execute(message, args) {
		client.on('message', async (msg) => {
			const SoundName = msg.content.split(" ")
			console.log(SoundName[1])
			if (fs.existsSync(path.join(__dirname, `../assets/sounds/dwight/dwight_${SoundName[1]}.mp3`))) {
				msg.member.voice.channel.join().then((connection) => {
					connection.play(path.join(__dirname, `../assets/sounds/dwight/dwight_${SoundName[1]}.mp3`))
				})
			} else {
				msg.channel.send('Computron can not find the file you are looking for. Its probably your fault though.')
			}
		})
	}
};