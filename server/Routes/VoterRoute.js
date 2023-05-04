import express from "express";
import { deleteVoter, getVoter, updatePassword, updateVoter } from "../Controllers/VoterController.js";

const router = express.Router()

router.get('/:id', getVoter)
router.put('/:id', updateVoter)
router.delete('/:id', deleteVoter)
router.put('/:id/update', updatePassword)


export default router