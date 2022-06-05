import BotCommand from "../structures/BotCommand";
import { SlashCommandBuilder } from '@discordjs/builders'

const command: BotCommand = {
    data: new SlashCommandBuilder()
        .setName('pay')
        .setDescription('pay someone a amount of money')
        .addUserOption(op => op
            .setName('target')    
            .setDescription('the person you are going to pay')
            .setRequired(true)
        )
        .addIntegerOption(op => op
            .setName('amount')
            .setDescription('the amount you are going to pay')
            .setRequired(true)
        ),

    execute:async (interaction, client) => {
        const target = interaction.options.getUser('target')
        const amount = interaction.options.getInteger('amount')
        const result = await client.Users.findOne({id: interaction.user.id})
        const targetResult = await client.Users.findOne({id: target?.id})

        if(!result) return interaction.reply({content: 'you dont own a aspeco account', ephemeral: true})
        if(!targetResult) return interaction.reply({content: `${target?.username} dont own a aspeco account`, ephemeral: true})

        client.Users.updateOne({id: target?.id}, {balance: targetResult.balance + amount!}).then(() => {
            client.Users.updateOne({id: interaction.user.id}, {balance: result.balance - amount!}).then(() => {
                return interaction.reply({content: `transaction Successful`})
            })
        })
    }
}

export default command