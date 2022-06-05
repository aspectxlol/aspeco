import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import BotCommand from '../structures/BotCommand'

const command: BotCommand = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('shows a profile command')
        .addUserOption(op => 
            op
            .setName('target')
            .setDescription('the target profile you want to view')
        ),
    execute: async (interaction, client) => {
        const targetUser = interaction.options.getUser('target')    
        if(targetUser) {
            const result = await client.Users.findOne({id: targetUser?.id})
            if(!result) return interaction.reply('that user is not in the database')
            const embed = new MessageEmbed()
                .setTitle(`${result.userTag}'s Profile`)
                .setColor('BLUE')
                .addFields([
                    {name: 'balance', value: `${result.balance}`}
                ])
            return interaction.reply({embeds: [embed]})
        } else {
            const result =  await client.Users.findOne({id: interaction.user.id})
            if(result) {
                const embed = new MessageEmbed()
                    .setTitle(`${result.userTag}'s Profile`)
                    .setColor('BLUE')
                    .addFields([
                        {name: 'balance', value: `${result.balance}`}
                    ])

                return interaction.reply({embeds: [embed]})
            }
            const data = new client.Users({
                userTag: interaction.user.tag,
                id: interaction.user.id,
                balance: 0,
                business: []
            })
            data.save().then( () => {
                const embed = new MessageEmbed()
                    .setTitle(`${interaction.user.tag}'s Profile`)
                    .setColor('BLUE')
                    .addFields([
                        {name: 'balance', value: `${data.balance}`}
                    ])
                return interaction.reply({embeds: [embed]})
            })
        }
    }
}

export default command