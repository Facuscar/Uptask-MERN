import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ProjectTitle from "../components/Atoms/ProjectTitle";
import ProjectForm from "../components/ProjectForm";
import { Project } from "../types/Project";
import { getProject } from "../utils/getProject";

const EditProject: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState<Project>();

    const { id } = params;

    useEffect(() => {
        const loadProject = async () => {
            const data = await getProject(id);
            if (!data) navigate('/');
            setProject(data);
        } 
        loadProject();
    }, []);

    if (!project) return <>Edit project skeleton...</>

    const { name } = project;

    return (
        <>
            <ProjectTitle title={`Edit: ${name}`} />
            <div className="p-5 flex justify-center">
                <ProjectForm project={project} />
            </div>
        </>
    );
}

export default EditProject;