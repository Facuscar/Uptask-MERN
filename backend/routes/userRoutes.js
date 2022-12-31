import express from "express"
import { registerUser, authUser, confirm, forgotPassword } from "../controllers/userController.js";

const router = express.Router()

router.post('/', registerUser);
router.post('/login', authUser);
router.get('/confirm/:token', confirm);
router.post('/forgot-password', forgotPassword);

export default router;