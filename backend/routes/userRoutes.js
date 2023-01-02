import express from "express"
import { registerUser, authUser, confirm, forgotPassword, verifyToken, newPassword } from "../controllers/userController.js";

const router = express.Router()

router.post('/', registerUser);
router.post('/login', authUser);
router.get('/confirm/:token', confirm);
router.post('/forgot-password', forgotPassword);
router.route('/forgot-password/:token').get(verifyToken).post(newPassword);

export default router;