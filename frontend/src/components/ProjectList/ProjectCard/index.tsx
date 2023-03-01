import { useAuth } from "context/AuthProvider";
import { Project } from "types/Project";

import * as S from './styles';

type ProjectProps = {
    project: Project;
};

const ProjectCard: React.FC<ProjectProps> = ({ project }) => {
    const { auth } = useAuth();
    const { name, client, _id, creator } = project;

    const isCreator = auth?._id === creator;

    return (
        <S.Wrapper>
            <S.ProjectName projectName={name} clientName={client} isCreator={isCreator} />

            <S.ProjectLink to={_id}>Go to project</S.ProjectLink>
        </S.Wrapper>
    )
}

export default ProjectCard;