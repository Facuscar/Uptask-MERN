import express from 'express';
import { getProjects, getProject, newProject, editProject, deleteProject, addContributor, deleteContributor } from "../controllers/projectController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route('/').get(checkAuth, getProjects).post(checkAuth, newProject);

router.route('/:id').get(checkAuth, getProject).put(checkAuth, editProject).delete(checkAuth, deleteProject);

router.post('/add-contributor', checkAuth, addContributor);
router.post('/delete-contributor', checkAuth, deleteContributor);

export default router;