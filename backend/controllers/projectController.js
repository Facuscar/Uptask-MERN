import Project from "../models/Project.js";

export const getProjects = async (req, res) => {

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

};

export const editProject = async (req, res) => {

};

export const deleteProject = async (req, res) => {

};

export const addCollaborator = async (req, res) => {

};

export const deleteCollaborator = async (req, res) => {

};

export const getTasks = (req, res) => {

}