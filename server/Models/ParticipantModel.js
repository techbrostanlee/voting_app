import mongoose from "mongoose";


const participantSchema = new mongoose.Schema({
   
    name : {
        type: String,
        required: true
    },
    party : {
        type: String,
        required: true
    },
    image: String,
    votes: []
},
{timestamps: true}
);

const participantModel = mongoose.model('participant', participantSchema)

export default participantModel; 