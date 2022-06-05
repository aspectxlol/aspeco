import { SlashCommandBuilder } from '@discordjs/builders'
import BotCommand from '../structures/BotCommand'

const pingCommand: BotCommand = {
    data: new SlashCommandBuilder()
                .setName('ping')
                .setDescription('adawafaf'),
    execute: async (interaction, client) => {
        interaction.reply(`${client.ws.ping}`)
    }
}

export default pingCommand