import { Schema } from "mongoose"

export interface nft {
    originalOwner: {
        name: string
        id: number
    }
    currentOwner: {
        name: string
        id: number
    }
    name: string
    image: string   
}

const nftSchema = new Schema<nft>({
    originalOwner: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    currentOwner: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    image: {
        type: String,
        required: true
    }
})

export default nftSchema