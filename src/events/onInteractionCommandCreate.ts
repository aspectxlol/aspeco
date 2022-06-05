import { CommandInteraction, Interaction, MessageEmbed } from "discord.js";
import Bot from "../structures/bot";

export default async function(interaction: Interaction, client: Bot) {
    if(!interaction.isCommand()) return;
    const command = client.command.get(interaction.commandName)
    if(!command) return
    const CommandInteraction = interaction as CommandInteraction<'cached'>
    try {
        await command.execute(CommandInteraction, client)
    } catch (err) {
        console.error(err)
        const embed = new MessageEmbed()
            .setTitle(`Error`)
            .setDescription(`${err}`)
            .setColor('RED')
        
        interaction.reply({embeds: [embed], ephemeral: true})
    }
}