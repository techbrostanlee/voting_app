import mongoose from "mongoose";

const voterSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: true
        },
        password : {
            type: String,
            required: true
        },
        nin : {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
)
const voterModel = mongoose.model("voter", voterSchema)

export default voterModel;