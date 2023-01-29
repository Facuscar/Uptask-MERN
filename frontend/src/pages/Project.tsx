import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import RestaurantPageComponent from '../components/ProjectPage';
import { Project } from "../types/Project";
import { getProject } from '../utils/getProject';

const ProjectPage: React.FC = () => {
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

    if (!project) return <>Project skeleton...</>;

    return (
        <RestaurantPageComponent project={project} />
    );
}

export default ProjectPage;