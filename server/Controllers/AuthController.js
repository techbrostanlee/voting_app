import voterModel from "../Models/VoterModel.js";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";
const secret = "wiiwijdndjdjdjjdnndnnddd"

//registering new Voter
export const registerVoter = async(req,res) =>{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword
        const newVoter = new voterModel(req.body)
        const {nin} = req.body
    try {
        // const oldnin = await voterModel.findOne({nin})

        // if(oldnin){
        //  res.status(400).json({message: "nin is already registered"})
        // }
            
        const voter =  await newVoter.save()
        const token = jwt.sign({
        nin : voter.nin, id:voter._id, name:voter.name
     }, process.env.JWT_KEY,  {expiresIn: "1h"}
      )
        res.status(200).json({voter, token})
       
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//login voter
export const loginVoter = async(req, res) =>{
    const {nin, password} = req.body;

    try {
        const voter = await voterModel.findOne({nin: nin})

        const validity = await bcrypt.compare(password, voter.password)
        if(!validity){
            res.status(400).json("wrong password");
            
        }else{
            const token = jwt.sign({
                nin : voter.nin, id:voter._id, name:voter.name
             }, process.env.JWT_KEY,  {expiresIn: "1h"}
              )
                res.cookie('token', token).json({
                    id: voter._id,
                    nin, name:voter.name
                })
            
        }
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}



export const logout = async(req, res)=>{
    res.cookie('token','').json('ok');
}