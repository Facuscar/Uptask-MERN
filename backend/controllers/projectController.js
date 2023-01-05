import Project from "../models/Project.js";

export const getProjects = async (req, res) => {
    const projects = await Project.find().where('creator').equals(req.user);
    res.json(projects);
};

export const newProject = async (req, res) => {
    const project = new Project(req.body);
    project.creator = req.user._id;

    try {
        const dbProject = await project.save();
        res.json(dbProject);
    } catch (error) {
        console.log(error);
    }
};

export const getProject = async (req, res) => {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
        const error = new Error('Not found')
        return res.status(404).json({ msg: error.message });
    }

    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('You dont have access to this project')
        return res.status(401).json({ msg: error.message });
    }

    res.json(project);
};

export const editProject = async (req, res) => {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
        const error = new Error('Not found')
        return res.status(404).json({ msg: error.message });
    }

    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('You dont have access to this project')
        return res.status(401).json({ msg: error.message });
    }

    project.name = req.body.name || project.name
    project.descriptin = req.body.descriptin || project.descriptin
    project.dueDate = req.body.dueDate || project.dueDate
    project.client = req.body.client || project.client

    try {
        const dbProject = await project.save();
        res.json(dbProject);
    } catch (error) {
        console.log(error);
    }
};

export const deleteProject = async (req, res) => {

};

export const addCollaborator = async (req, res) => {

};

export const deleteCollaborator = async (req, res) => {

};

export const getTasks = (req, res) => {

}