import BotCommand from "../structures/BotCommand";
import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from "discord.js";
import { v4 } from 'uuid'

const command: BotCommand = {
    data: new SlashCommandBuilder()
        .setName('nft')
        .setDescription('upload an nft to auction')
        .addSubcommand(op => op    
            .setName('auction')
            .setDescription('auction an nft')
            .addAttachmentOption(op => op
                .setName('attachment')
                .setDescription('the nft')
                .setRequired(true)
            ) 
            .addStringOption(op => op
                .setName('name')
                .setDescription('the name of the nft')
                .setRequired(true)
            )
            .addIntegerOption(op => op 
                .setName('startbid')   
                .setDescription('the starting bid') 
                .setMinValue(1000)
                .setRequired(true)
            )
        ),
    execute: async (interaction, client) => {
        const name = interaction.options.getString('name')
        const attachment = interaction.options.getAttachment('attachment')
        const startbid = interaction.options.getInteger('startbid')
        const result = await client.Users.findOne({id: interaction.user.id})

        if(!result) return interaction.reply({content: 'u see in order to sell nfts u need to have an account AND YOU SOMEHOW DONT HAVE AN ACCOUNT\nSO GO AND MAKE A ACCOUNT RN OR ELSE IM GONNA MURDER YOUR CHILD', ephemeral: true})
        if(!(attachment?.attachment.toString().endsWith('.png'))) return interaction.reply({content: 'the attachment needs to be in a .png type file format', ephemeral: true})

        const data = new client.auctions({
            author: {
                name: `${interaction.user.username}`,
                id: interaction.user.id
            },
            name: `${name}`,
            image: `${attachment.url}`,
            bid: startbid,
            uuid: v4()
        })

        data.save().then((data) => {
            const auction = new MessageEmbed()
                .setTitle(`${name}`)
                .setDescription(`${interaction.user.username} auctioned this nft for a starting bid of $${startbid}`)
                .setImage(attachment?.url!)
                .setFooter({text: `${data.uuid}`})
            return interaction.reply({embeds: [auction]})
        })
    }
}

export default command