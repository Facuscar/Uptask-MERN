import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Contributors from "./components/Contributors";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

import { Project } from "../../types/Project"
import { getProject } from "../../utils/getProject";
import { Contributor } from '../../types/Contributor';

const ProjectPage: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState<Project>();

    const { id } = params;

    useEffect(() => {
        const loadProject = async () => {
            const data = await getProject(id);
            if (!data) {
                navigate('/');
                return;
            };
            setProject(data);
        } 
        loadProject();
    }, []);

    if (!project) return <>Project Page skeleton...</>;

    const { name, _id, tasks, contributors } = project;

    //Refactor the option id field issue
    if (!_id) return <></>;

    return (
        <>
            <Header name={name} projectId={_id} />

            <Tasks projectId={_id} projectTasks={tasks} />

            <Contributors projectId={_id} projectContributors={contributors} />

        </>
    );
}

export default ProjectPage;