import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import ProjectList from "components/ProjectList";
import { Project } from "types/Project";
import { getConfig } from "utils/getConfig";

import * as S from './styles';

const ProjectsPage: React.FC = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<Project[]>();

    useEffect(() => {
       const getProjects = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/');
                    return;
                }

                const { data } = await axios<Project[]>(import.meta.env.VITE_API_PROJECTS_URL, getConfig(token));

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
        <S.ListWrapper>
            {projects?.length ? <ProjectList projects={projects} /> : <S.AltText>You haven't created any projects yet</S.AltText>}
        </S.ListWrapper>
    )
}

export default ProjectsPage;