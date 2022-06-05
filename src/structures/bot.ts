import { Client, Collection, Intents } from "discord.js";
import { model, Model } from "mongoose";
import userSchema, { user } from "../utils/models/User";
import nftSchema, { nft } from "../utils/models/nft";
import BotCommand from "./BotCommand";
import auctionSchema, { auction } from "../utils/models/auctions";

export default class Bot extends Client {
    command: Collection<string, BotCommand>
    Users: Model<user>
    nft: Model<nft>
    auctions: Model<auction>

    constructor() {
        super({
            intents: new Intents(32767)
        })
        this.Users = model('user', userSchema)
        this.nft = model('nft', nftSchema)
        this.auctions = model('auctions', auctionSchema)
        this.command = new Collection()
    }
}