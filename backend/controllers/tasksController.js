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
        dbProject.tasks.push(dbTask._id);
        await dbProject.save();
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
    const { id } = req.params;
    const task = await Task.findById(id).populate('project');

    const { project } = task;

    if (!project) {
        const error = new Error('The requested task or project does not exist');
        return res.status(404).json({ msg: error.message });
    }

    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('You dont have access to this project');
        return res.status(403).json({ msg: error.message });
    }

    task.name = req.body.name || task.name;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.dueDate = req.body.dueDate || task.dueDate;

    try {
        const dbTask = await task.save();
        res.json(dbTask)
    } catch (error) {
        console.log(error);
    }
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id).populate('project');

    const { project } = task;

    if (!project) {
        const error = new Error('The requested task or project does not exist');
        return res.status(404).json({ msg: error.message });
    }

    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('You dont have access to this project');
        return res.status(403).json({ msg: error.message });
    }

    try {
        await task.deleteOne();
        res.json({ msg: 'Task deleted successfully' });
    } catch (error) {
        console.log(error);
    }
}

export const toggleTask = async (req, res) => {
    
}