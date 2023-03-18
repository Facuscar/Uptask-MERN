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
    const { project, _id } = req.body;
    const dbProject = await Project.findById(project);
    const task = await Task.findById(_id);

    if (!dbProject) {
        const error = new Error('The requested task or project does not exist');
        return res.status(404).json({ msg: error.message });
    }

    if (dbProject.creator.toString() !== req.user._id.toString()) {
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
        const dbProject = await Project.findById(project);
        dbProject.tasks.pull(task._id);

        await Promise.allSettled([await task.deleteOne(), await dbProject.save()]);
        res.json({ msg: 'Task deleted successfully' });
    } catch (error) {
        console.log(error);
    }
}

export const toggleTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id).populate('project');

    const { project } = task;

    if (!project) {
        const error = new Error('The requested task or project does not exist');
        return res.status(404).json({ msg: error.message });
    }

    const isCreator = project.creator.toString() === req.user._id.toString();
    const isContributor = project.contributors.some( (contributor) => contributor._id.toString() === req.user._id.toString());

    if (!isCreator && !isContributor) {
        const error = new Error('You dont have access to this project');
        return res.status(404).json({ msg: error.message });
    }

    task.state = !task.state
    task.completedBy = req.user._id;

    await task.save();

    const dbTask = await Task.findById(id)
        .populate('project')
        .populate('completedBy');

    console.log(dbTask);

    dbTask.project = dbTask.project._id;

    res.json({task: dbTask, msg: 'Task state changed successfully'});
}