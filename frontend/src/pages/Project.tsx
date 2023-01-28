import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import RestaurantPageComponent from '../components/ProjectPage';
import { Project } from "../types/Project";

const ProjectPage: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState<Project>();

    const { id } = params;

    useEffect(() => {
        const getProject = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/'); 
                    return;
                }

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                };
                
                const { data } = await axios.get<Project>(`${import.meta.env.VITE_API_PROJECTS_URL}/${id}`, config)
                setProject(data);
            } catch (error) {
                console.log(error);
            }
        }

        getProject();
    }, []);

    if (!project) return <>Loading...</>;

    return (
        <RestaurantPageComponent project={project} />
    );
}

export default ProjectPage;