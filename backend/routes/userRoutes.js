import express from "express"
import { registerUser, authUser, confirm } from "../controllers/userController.js";

const router = express.Router()

router.post('/', registerUser);
router.post('/login', authUser);
router.get('/confirm/:token', confirm);

export default router;