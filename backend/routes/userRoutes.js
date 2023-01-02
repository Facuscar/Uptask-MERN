import express from "express"
import { registerUser, authUser, confirm, forgotPassword, verifyToken } from "../controllers/userController.js";

const router = express.Router()

router.post('/', registerUser);
router.post('/login', authUser);
router.get('/confirm/:token', confirm);
router.post('/forgot-password', forgotPassword);
router.get('/forgot-password/:token', verifyToken)

export default router;