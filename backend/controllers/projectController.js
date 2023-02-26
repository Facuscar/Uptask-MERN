import Project from "../models/Project.js";
import User from "../models/User.js";

export const getProjects = async (req, res) => {
    const projects = await Project.find({
        $or : [
            {contributors: { $in: req.user }},
            {creator: { $in: req.user }},
        ],
    }).select('-tasks');

    res.json(projects);
};

export const newProject = async (req, res) => {
    const project = new Project(req.body);
    project.creator = req.user._id;

    try {
        await project.save();
        res.json({ msg: 'Project created successfully' });
    } catch (error) {
        console.log(error);
    }
};

export const getProject = async (req, res) => {
    const { id } = req.params;

    const project = await Project.findById(id).populate('tasks').populate('contributors', 'name email');

    if (!project) {
        const error = new Error('Not found');
        return res.status(404).json({ msg: error.message });
    }

    const isCreator = project.creator.toString() === req.user._id.toString();
    const isContributor = project.contributors.some( (contributor) => contributor._id.toString() === req.user._id.toString());

    if (!isCreator && !isContributor) {
        const error = new Error('You dont have access to this project');
        return res.status(401).json({ msg: error.message });
    }

    res.json({ project, msg: 'Project retrieved successfully' });
};

export const editProject = async (req, res) => {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
        const error = new Error('Not found');
        return res.status(404).json({ msg: error.message });
    }

    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('You dont have access to this project');
        return res.status(401).json({ msg: error.message });
    }

    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;
    project.dueDate = req.body.dueDate || project.dueDate;
    project.client = req.body.client || project.client;

    try {
        const dbProject = await project.save();
        res.json({ msg: 'Project modified successfully' });
    } catch (error) {
        console.log(error);
    }
};

export const deleteProject = async (req, res) => {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
        const error = new Error('Not found');
        return res.status(404).json({ msg: error.message });
    }

    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('Only the owner can delete the project');
        return res.status(401).json({ msg: error.message });
    }

    try {
        await project.deleteOne();
        res.json({ msg: 'Project deleted successfully' });
    } catch (error) {
        console.log(error);
    }
};

export const getContributor = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({email}).select('-confirmed -createdAt -password -token -updatedAt -__v');

    if (!user) {
        const error = new Error('User not found');
        return res.status(404).json({ msg: error.message });
    }

    res.json({
        user, 
        msg: 'User found',
    });
};

export const addContributor = async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        const error = new Error('Project not found');
        return res.status(404).json({ msg: error.message });
    }

    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('Only project owners can add contributors');
        return res.status(404).json({ msg: error.message });
    }

    const { contributor } = req.body;
    const user = await User.findOne({ email: contributor }).select("-confirmed -createdAt -password -token -updatedAt -__v");

    if (!user) {
        const error = new Error('User not found');
        return res.status(404).json({ msg: error.message });
    };

    if (project.creator.toString() === user._id.toString()) {
        const error = new Error('You already are part of the project!');
        return res.status(404).json({ msg: error.message });
    }

    if (project.contributors.includes(user._id)) {
        const error = new Error('This user is already contributor for this project');
        return res.status(404).json({ msg: error.message });
    }

    project.contributors.push(user._id);

    await project.save();
    res.json({ msg: 'Contributor included successfully' });
};

export const deleteContributor = async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        const error = new Error('Project not found');
        return res.status(404).json({ msg: error.message });
    }

    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('Invalid action');
        return res.status(404).json({ msg: error.message });
    }

    project.contributors.pull(req.body.id);
    console.log(project.contributors);
    await project.save();
    res.json({ msg: 'Contributor deleted successfully' });
};
