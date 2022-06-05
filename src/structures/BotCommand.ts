import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder, SlashCommandSubcommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
import Bot from './bot'

export default interface BotCommand {
    data:   | SlashCommandBuilder
            | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
            | SlashCommandSubcommandsOnlyBuilder
            | SlashCommandSubcommandBuilder;
    execute: (interaction: CommandInteraction<'cached'>, client: Bot) => Promise<any>
}