import { Schema } from "mongoose";

export interface user {
    userTag: string
    id: number
    balance: number
    business: string[]
}

const userSchema = new Schema<user>({
    userTag: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    business: []
})

export default userSchema