import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "components/Atoms/Alert";
import ProjectList from "components/ProjectList";
import { useProjects } from "context/ProjectProvider";
import { getConfig } from "utils/getConfig";
import { Project } from "types/Project";

import * as S from './styles';

const ProjectsPage: React.FC = () => {
    const navigate = useNavigate();
    const { filteredProjects, setProjects, projects } = useProjects();
    const [loading, setLoading] = useState<boolean>(true);

    const [showAlert, setShowAlert] = useState<boolean>(false);

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
                setShowAlert(true);
            } finally {
                setLoading(false);
            }
        } 
        
        getProjects();
    }, []);

    if (loading) return (
        <S.ListWrapper>
            <S.ProjectSkeletonWrapper>
                <S.TextSkeleton />
            </S.ProjectSkeletonWrapper>
            <S.ProjectSkeletonWrapper>
                <S.TextSkeleton />
            </S.ProjectSkeletonWrapper>
            <S.ProjectSkeletonWrapper>
                <S.TextSkeleton />
            </S.ProjectSkeletonWrapper>
        </S.ListWrapper>
    );

    return (
        <>
            {showAlert && <Alert message="Oops... something went wrong" error />}
            <S.ListWrapper>
                {projects?.length ?
                    (filteredProjects?.length ?
                        <ProjectList projects={filteredProjects} /> : 
                        <S.AltText>No projects match with your search</S.AltText>) :
                    <S.AltText>You don't have any projects yet</S.AltText>}
            </S.ListWrapper>
        </>
    )
}

export default ProjectsPage;