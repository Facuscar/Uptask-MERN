import express from 'express';
import { getProjects, getProject, newProject, editProject, deleteProject, addCollaborator, deleteCollaborator } from "../controllers/projectController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route('/').get(checkAuth, getProjects).post(checkAuth, newProject);

router.route('/:id').get(checkAuth, getProject).put(checkAuth, editProject).delete(checkAuth, deleteProject);

router.post('/add-collaborator', checkAuth, addCollaborator);
router.post('/delete-collaborator', checkAuth, deleteCollaborator);

export default router;