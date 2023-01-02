import express from "express"
import { registerUser, authUser, confirm, forgotPassword, verifyToken, newPassword, profile } from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router()

router.post('/', registerUser);
router.post('/login', authUser);
router.get('/confirm/:token', confirm);
router.post('/forgot-password', forgotPassword);
router.route('/forgot-password/:token').get(verifyToken).post(newPassword);

router.get('/profile', checkAuth, profile)

export default router;