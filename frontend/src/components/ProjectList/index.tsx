
import { Project } from "../../types/Project";
import ProjectCard from "./ProjectCard";

type ProjectListProps = {
    projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
    return (
       <>
            {projects.map(project => (
                <ProjectCard project={project} key={project._id} />
            ))}
       </>
    )
}

export default ProjectList;