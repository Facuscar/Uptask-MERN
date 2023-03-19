import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

import ProjectTitle from "components/Atoms/ProjectTitle";
import ProjectForm from "components/ProjectForm";
import { Project } from "types/Project";
import { getProject } from "utils/getProject";

import * as S from './styles';
import { Wrapper, FormWrapperSkeleton } from './styles';

const EditProjectPage: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState<Project>();

    const { id } = params;

    useEffect(() => {
        const loadProject = async () => {
            const data = await getProject(id);
            if (!data) navigate('/');
            setProject(data.project);
        } 
        loadProject();
    }, []);

    if (!project) return (
        <S.Wrapper>  
            <S.TitleSkeleton />
            <S.FormWrapperSkeleton>
                <S.InputSkeleton />
                <S.InputSkeleton />
                <S.InputSkeleton />
                <S.InputSkeleton />
                <S.ButtonSkeleton />
            </S.FormWrapperSkeleton>
        </S.Wrapper>
    );

    const { name } = project;

    return (
        <>
            <ProjectTitle title={`Edit: ${name}`} />
            <S.FormWrapper>
                <ProjectForm project={project} />
            </S.FormWrapper>
        </>
    );
}

export default EditProjectPage;