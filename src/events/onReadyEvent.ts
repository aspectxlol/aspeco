import { connect } from "mongoose";
import { RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord-api-types/v10'
import { REST } from '@discordjs/rest'
import Bot from "../structures/bot";
import fs from 'fs'
import '@colors/colors'
import moment from 'moment'
import app from "../server";

export default async (client: Bot) => {
    console.clear()
    client.user?.setUsername('Aspeco')
    connect(`${process.env.MONGO_URI!}`, (err) => {
        if(err) return console.error(err)
        console.log(`                       ()`.blue + `| connected to ` + ''.green + ' Database')
    })
    console.log(''.blue + ``.bgBlue + ' '.blue.bgGreen + ` AspectxDev`.bgGreen.white + ''.green.bgRed + ` ${client.user?.username}`.bgRed.white + ''.red + `                                                                                                ` + ''.blue + `${moment().format('h:mm:ss a')}`.bgBlue.white + ''.blue)

    const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = []
    const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'))

    for(const file of commandFiles) {
        const command = await require(`../commands/${file}`)?.default
        if(!command) {
            return console.log(`                        (/)`.red + `${file} seems to be exporting incorrectly`)
        }

        const data = command.data?.toJSON() as RESTPostAPIChatInputApplicationCommandsJSONBody
        client.command.set(data.name, command)
        commands.push(data)
        console.log(`                       (/)`.green + `| Pushed ${file}`)
    }

    const rest = new REST({ version: '9' }).setToken(process.env.TOKEN!);

    rest.put(Routes.applicationGuildCommands(client.user?.id!, '932659866110160936'), { body: commands })
        .then(() => console.log(`                       (/)`.green + `| Registered ` + 'ﭮ'.cyan      + ` Commands`))
        .catch(console.error);

    const port = process.env.PORT || 3000
    app.listen(port, () => console.log(`                       ()`.red + `| server Started on http://localhost:${port}`))
}