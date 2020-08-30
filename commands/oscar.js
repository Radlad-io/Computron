/////////////////////

// DWIGHT COMMANDS //

/////////////////////


const fs = require('fs');
const path = require('path');
const prefix = config.prefix;
const { OpusEncoder } = require('@discordjs/opus');
const pathToFfmpeg = require('ffmpeg-static');

module.exports = {
	name: 'Dwight',
	description: 'Dwight soundboard',
	execute(message, args) {
		message.channel.send('Pong.');
	},
};