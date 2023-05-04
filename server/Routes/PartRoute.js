import express from 'express';
import mongoose from "mongoose";
import {/* createpart,*/ getPart, getParts, votePart } from '../Controllers/PartController.js';

const router = express();

import fs from "fs"
import path from 'path';
import multer from 'multer';
import participantModel from '../Models/ParticipantModel.js';


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads')
    },
    filename: (req, file, cb) =>{
        console.log(file)
        cb(null,file.originalname)
    }
})



const upload = multer({ storage: storage });


// create a participant
router.post('/', upload.single('avatar') ,async(req, res) =>{
    
    try {
        const { name, party } = req.body;
        const image = req.file.picture;

        const newParticipant = await participantModel.create({ name, party, image });
        
        res.status(200).json("post created");
        console.log(newParticipant)
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


/*router.post('/', createpart)*/
router.get('/participants', getParts)
router.get('/:id', getPart);
router.put('/:id', votePart);

export default router;