import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProjectList from "components/ProjectList";
import { useProjects } from "context/ProjectProvider";
import { getConfig } from "utils/getConfig";
import { Project } from "types/Project";

import * as S from './styles';

const ProjectsPage: React.FC = () => {
    const navigate = useNavigate();
    const { filteredProjects, setProjects, projects } = useProjects();
    const [loading, setLoading] = useState<boolean>(true);

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
            {projects?.length ? 
                (filteredProjects?.length ? 
                    <ProjectList projects={filteredProjects} /> : 
                    <S.AltText>No projects match with your search</S.AltText>) : 
                <S.AltText>You don't have any projects yet</S.AltText>}
        </S.ListWrapper>
    )
}

export default ProjectsPage;