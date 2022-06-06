import BotCommand from "../structures/BotCommand";
import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { createLink } from "../utils/pool";

const command: BotCommand = {
    data: new SlashCommandBuilder()
        .setName('store')
        .setDescription('opens the store menu'),
    execute: async (interaction, client) => {
        const id = await createLink(interaction.user)
        // const link = `http://localhost:3000/store/${id}`
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle('LINK')
                    .setLabel('Store URL')
                    .setURL(`${process.env.REDIRECT_URL}`)
            )
        
        return interaction.reply({components: [row]})
    }
}

export default command