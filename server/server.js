import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from "cors";
import multer  from 'multer';
import cookieParser from "cookie-parser";
import  jwt  from "jsonwebtoken";
const secret = "wiiwijdndjdjdjjdnndnnddd"



//routes
import AuthRoute from './Routes/AuthRoute.js';
import VoterRoute from './Routes/VoterRoute.js';
import PartRoute from './Routes/PartRoute.js'

//Middlewares
const app = express();
app.use(express.static('public'));
app.use(cors({
    origin: 'http://localhost:3000' // or whatever the URL of your React app is
  }));
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cookieParser())
dotenv.config();

//mongo database
mongoose.connect( process.env.MONGO_DB, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>app.listen(process.env.PORT, ()=> console.log(`listening at port ${process.env.PORT}`))).catch((error)=>console.log(error));


//usage of routes
app.use('/auth', AuthRoute);
app.use('/voter', VoterRoute);
app.use('/participant', PartRoute);