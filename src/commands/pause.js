const { SlashCommandBuilder } = require('@discordjs/builders');
const { AudioPlayerStatus } = require('@discordjs/voice');

module.exports = {
	// data of the command
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pauses the player'),
	// array of guild ids, null for global command
	guilds: ['880093118538584095'],
	// method to run the command
	async run(interaction) {
		const member = interaction.member;

		if (!member) return interaction.reply({ content: 'You can only execute this command within a guild.', ephemeral: true });

		await interaction.deferReply();

		if (!member.voice.channelId) return interaction.editReply('You must be in a voice channel to run this command.');

		const connection = interaction.client.connections.get(interaction.guildId);

		if (!connection || connection.audioPlayer.state.status === AudioPlayerStatus.Idle) {
			return interaction.editReply('No music is currently playing.');
		}

		if (connection.audioPlayer.state.status === AudioPlayerStatus.Paused) {
			return interaction.editReply('The player is already paused.');
		}

		connection.audioPlayer.pause();
		await interaction.editReply(':pause_button: **Paused**');
	},
};