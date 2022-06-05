import { User } from "discord.js"
import crypto from 'crypto'

export interface link {
    user: {
        name: string,
        id: string,
        avatar: string
    },
    id: string
}

let linkPool: link[] = []

export async function createLink(user:User) {
    const id = crypto.randomBytes(4).toString('hex')
    linkPool.push({
        user: {
            name: user.username,
            id: user.id,
            avatar: user.displayAvatarURL({format: 'png', dynamic: true})
        },
        id: id
    })
    setTimeout(function() {
        if (isValidLink(id)) removeLink(id);
    }, 900000);
    return id
}


export function isValidLink(id: string) {
    for (let i = 0; i < linkPool.length; i++) if (linkPool[i].id == id) return true;
    return false;
}

export function removeLink(id: string) {
    for (let i = 0; i < linkPool.length; i++) if (linkPool[i].id == id) delete linkPool[i];
    linkPool = linkPool.filter(n => n);
}

export function getDiscordUser(id: string) {
    for (let i = 0; i < linkPool.length; i++) if (linkPool[i].id == id) return linkPool[i].user;
    return null;
}