import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ProjectTitle from "../Atoms/ProjectTitle";
import ProjectForm from "../ProjectForm";

import { Project } from "../../types/Project";
import { getProject } from "../../utils/getProject";

import * as S from './styles';

const EditProjectPage: React.FC = () => {
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
            <S.FormWrapper>
                <ProjectForm project={project} />
            </S.FormWrapper>
        </>
    );
}

export default EditProjectPage;