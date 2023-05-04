import multer from "multer";
import mongoose from "mongoose";
import participantModel from "../Models/ParticipantModel.js";
/*
import fs from "fs"
import path from 'path';


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads/')
    },
    filename: (req, file, cb) =>{
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})



const upload = multer({ storage: storage });


// create a participant
export const createpart = ( upload.single('avatar') ,async(req, res) =>{
    
    try {
        const { name, party } = req.body;
        const image = {
            data: fs.readFileSync("uploads/" + req.file.filename),
            contentType: "image/png"

        }

        const newParticipant = await participantModel.create({ name, party, image });
        
        res.status(200).json("post created");
        console.log(newParticipant)
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})
*/


//get participant
export const getPart = async(req,res) =>{
    const id = req.params.id;

    try {
        const participant = await participantModel.findById(id)
        if(participant){
            res.status(200).json(participant);
        }else{
            res.status(500).json('no such participant exists');
        }
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//get all participants
export const getParts = async(req,res) =>{
    

    try {
        const participants = await participantModel.find()
        if(participants){
            res.status(200).json(participants);
        }else{
            res.status(500).json('no such participants exists');
        }
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//vote for a participant

export const votePart = async(req, res) => {
    const id = req.params.id;
    const {voterId} = req.body;

    try {
        const vote = await participantModel.findById(id);
        if(!vote.votes.includes(voterId)){
            await vote.updateOne({$push: {votes: voterId}});
            res.status(200).json('you just voted');
        } else {
            res.status(200).json('you have already voted');
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


