import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import ProjectList from "../components/ProjectList";
import { Project } from "../types/Project";

const Projects: React.FC = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<Project[]>();

    useEffect(() => {
       const getProjects = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) navigate('/');

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };

                const { data } = await axios<Project[]>(import.meta.env.VITE_API_PROJECTS_URL, config);

                setProjects(data);

            } catch (error: any) {
                console.log(error.response);
            } finally {
                setLoading(false);
            }
       } 
       
       getProjects();
    }, []);

    if (loading) return <div>Projects skeletons..</div>

    return (
        <div className="bg-white shadow mt-10 rounded-lg">
            {projects?.length ? <ProjectList projects={projects} /> : <p className="text-center text-gray-600 uppercase p-5">You haven't created any projects yet</p>}
        </div>
    )
}

export default Projects;