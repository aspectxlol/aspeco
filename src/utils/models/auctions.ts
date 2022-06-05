import { Schema } from "mongoose"

export interface auction {
    author: {
        name: string
        id: number
    }
    name: string
    image: string  
    bid: number,
    uuid: string
}

const auctionSchema = new Schema<auction>({
    author: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: Number,
            required: true
        }
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    bid: {
        type: Number,
        required: true
    },
    uuid: {
        type: String,
        required: true
    }
})

export default auctionSchema