import Bot from "./structures/bot";
import { config } from "dotenv";
import onReadyEvent from "./events/onReadyEvent";
import onInteractionCommandCreate from "./events/onInteractionCommandCreate";
config()

const client = new Bot()

client.on('ready', () => {onReadyEvent(client)})
client.on('interactionCreate', (interaction) => {onInteractionCommandCreate(interaction, client)})

client.login(process.env.TOKEN)