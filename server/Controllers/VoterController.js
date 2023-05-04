
import VoterModel from "../Models/VoterModel.js";
import bcrypt from "bcrypt";


// get a voter
export const getVoter = async(req, res) => {
    const id = req.params.id;

    try {
        const voter = await VoterModel.findById(id);
        if(voter){
            const {password, ...otherDetails} = user._doc

            res.status(200).json(otherDetails);

        }else{
            res.status(404).json('no such user Exists');
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//update a user

export const updateVoter = async(req, res) =>{
    const id = req.params.id;
    const {currentVoterId, currentVoterAdminStatus/*, password*/} = req.body;

    try {
        if(id === currentVoterId || currentVoterAdminStatus){
            const voter = await VoterModel.findByIdAndDelete(id, req.body, {new:true});
            
            res.status(200).json(voter);
        }else{
            res.status(403).json('Access denied! you can only update your own profile');
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//delete a voter
export const deleteVoter = async(req, res) => {
    const id = req.params.id;
    

    const {currentVoterId, currentVoterAdminStatus} = req.body;

    try {
        if(currentVoterId === id || currentVoterAdminStatus){
            const voter = await VoterModel.findByIdAndDelete(id);
            res.status(200).json('Voter Deletes successfully');

        }else{
            res.status(403).json('Access denied! you can only delete your own profile');
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//update password
export const updatePassword = async(req, res) => {
    const id = req.params.id;
    const { currentPassword, newPassword, confirmPassword } = req.body;
        
    const client = await VoterModel.findById(id);
    const oldPassword = await bcrypt.compare(currentPassword, client.password);
    try {
        if (oldPassword) {
            if (newPassword !== confirmPassword) {
                res.status(400).json({ message: "New password and confirm password do not match" });
                return;
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            await VoterModel.updateOne({ _id: id }, { password: hashedPassword });
            res.status(200).json({ message: 'Password updated successfully' });
        } else {
            res.status(400).json({ message: "Current password is incorrect" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

