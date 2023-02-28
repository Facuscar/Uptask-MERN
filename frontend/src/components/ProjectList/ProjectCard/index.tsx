import { Project } from "types/Project";
import useAuth from "hooks/useAuth";

import * as S from './styles';

type ProjectProps = {
    project: Project;
};

const ProjectCard: React.FC<ProjectProps> = ({ project }) => {
    const userId = useAuth()?.auth?._id;
    const { name, client, _id, creator } = project;

    const isCreator = userId === creator;

    return (
        <S.Wrapper>
            <S.ProjectName projectName={name} clientName={client} isCreator={isCreator} />

            <S.ProjectLink to={_id}>Go to project</S.ProjectLink>
        </S.Wrapper>
    )
}

export default ProjectCard;