import express from 'express';

import { 
    getProjects, 
    getProject, 
    newProject, 
    editProject, 
    deleteProject,
    addContributor,
    getContributor,
    deleteContributor ,
    } from "../controllers/projectController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route('/').get(checkAuth, getProjects).post(checkAuth, newProject);

router.route('/:id').get(checkAuth, getProject).put(checkAuth, editProject).delete(checkAuth, deleteProject);

router.post('/contributor', checkAuth, getContributor);
router.post('/contributor/:id', checkAuth, addContributor);
router.post('/delete-contributor/:id', checkAuth, deleteContributor);

export default router;