import axios from "axios"
import { Router } from "express"
import { URLSearchParams } from 'url'
import data from '../../configs/oauth2.config'
import fetch from 'node-fetch'

const router = Router()

router.get('/', (req, res) => {
    const data_1 = new URLSearchParams();
    data_1.append('client_id', data.clientId);
    data_1.append('client_secret', data.clientSecret);
    data_1.append('grant_type', 'authorization_code');
    data_1.append('redirect_uri', `http://localhost:${data.port}/store`);
    data_1.append('scope', 'identify');
    data_1.append('code', req.query.code as string);

    fetch('https://discord.com/api/oauth2/token', { method: "POST", body: data_1 }).then(response => response.json()).then(async data1 => {
        axios.get("https://discord.com/api/users/@me", await make_config(data1.access_token)).then(response => {
            let avatar;
            if (response.data.avatar) {
                avatar = `https://cdn.discordapp.com/avatars/${response.data.id}/${response.data.avatar}.png`
            }
            else avatar = `https://cdn.discordapp.com/embed/avatars/${response.data.discriminator % 5}.png`
            res.render('store', {user: response.data, avatar: avatar})
        }).catch(err => {
            res.status(500).render('failed');
        });
    });
})

async function make_config(authorization_token: string) { // Define the function
    return {
      headers: { 
        "authorization": `Bearer ${authorization_token}` // Define the authorization
      }
    }
};

export default router