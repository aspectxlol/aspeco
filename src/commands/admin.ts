import BotCommand from "../structures/BotCommand";
import { SlashCommandBuilder } from '@discordjs/builders'

const command: BotCommand = {
    data: new SlashCommandBuilder()
        .setName('admin')
        .setDescription('a list of admin commands')
        .addSubcommand(op => op
            .setName('set')
            .setDescription('set a coins for the user')
            .addUserOption(op => op.setName('target').setDescription('the target user').setRequired(true))
            .addIntegerOption(op => op.setName('value').setDescription('the value of coins you want to set').setRequired(true))
        )
        .addSubcommand(op => op
            .setName('add')
            .setDescription('adds coins to the user')
            .addUserOption(op => op.setName('target').setDescription('the target user').setRequired(true))
            .addIntegerOption(op => op.setName('value').setDescription('the value of coins you want to set').setRequired(true))
        ),
    execute: async (interaction, client) => {
        if(interaction.options.getSubcommand() === 'set') {
            const target = interaction.options.getUser('target')
            const value = interaction.options.getInteger('value')
            const result = client.Users.findOne({id: target?.id})
            if(!result) return interaction.reply('that user is not registered')
            client.Users.updateOne({id: target?.id}, {balance: value}, () => {
                return interaction.reply('Done')
            })
        } else if(interaction.options.getSubcommand() === 'add') {
            const target = interaction.options.getUser('target')
            const value = interaction.options.getInteger('value')
            const result = await client.Users.findOne({id: target?.id})
            if(!result) return interaction.reply('that user is not registered')
            client.Users.updateOne({id: target?.id}, {balance: result.balance + value!}, () => {
                return interaction.reply('Done')
            })
        }
    }
}

export default command;