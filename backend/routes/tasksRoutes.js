import express from 'express';
import { addTask, getTask, updateTask, deleteTask, toggleTask } from "../controllers/tasksController.js";
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.post('/', checkAuth, addTask)
router.route('/:id').get(checkAuth, getTask).put(checkAuth, updateTask).delete(checkAuth, deleteTask)
router.post('/state/:id', checkAuth, toggleTask)

export default router;