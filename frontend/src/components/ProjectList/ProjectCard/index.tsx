import { Project } from "types/Project";

import * as S from './styles';

type ProjectProps = {
    project: Project;
};

const ProjectCard: React.FC<ProjectProps> = ({ project }) => {
    const { name, client, _id } = project;
    return (
        <S.Wrapper>
            <S.ProjectName projectName={name} clientName={client} />

            <S.ProjectLink to={_id}>Go to project</S.ProjectLink>
        </S.Wrapper>
    )
}

export default ProjectCard;