import ProjectList from "components/ProjectList";
import { useProjects } from "context/ProjectProvider";

import * as S from './styles';

const ProjectsPage: React.FC = () => {

    const { projects, loading } = useProjects();

    if (loading) return <div>Projects skeletons..</div>

    return (
        <S.ListWrapper>
            {projects?.length ? <ProjectList projects={projects} /> : <S.AltText>You haven't created any projects yet</S.AltText>}
        </S.ListWrapper>
    )
}

export default ProjectsPage;