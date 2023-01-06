import Project from "../models/Project.js";
import Task from "../models/Tasks.js";

export const addTask = async (req, res) => {
    const { project } = req.body;
    const dbProject = await Project.findById(project);

    if (!dbProject) {
        const error = new Error('The project does not exist');
        return res.status(404).json({ msg: error.message });
    }

    if (dbProject.creator.toString() !== req.user._id.toString()) {
        const error = new Error('You dont have access to this project');
        return res.status(403).json({ msg: error.message });
    }

    try {
        const dbTask = await Task.create(req.body);
        res.json(dbTask);
    } catch (error) {
        console.log(error);
    }
}

export const getTask = async (req, res) => {
    const { id } = req.params;
    const dbTask = await Task.findById(id).populate('project');

    const { project } = dbTask;

    if (!project) {
        const error = new Error('The requested task or project does not exist');
        return res.status(404).json({ msg: error.message });
    }

    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('You dont have access to this project');
        return res.status(403).json({ msg: error.message });
    }

    res.json(dbTask);
}

export const updateTask = async (req, res) => {
    
}

export const deleteTask = async (req, res) => {
    
}

export const toggleTask = async (req, res) => {
    
}