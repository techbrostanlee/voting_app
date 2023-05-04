import express from "express"
import { loginVoter, logout, /*profile,*/ registerVoter } from "../Controllers/AuthController.js";
const router = express.Router()

router.post('/register', registerVoter);
router.post('/login', loginVoter);
//router.get('/profile', profile);
router.post('/logout', logout);

export default router;