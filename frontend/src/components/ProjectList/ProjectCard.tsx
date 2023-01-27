import { Link } from "react-router-dom";

import { Project } from "../../types/Project";

type ProjectProps = {
    project: Project;
};

const ProjectCard: React.FC<ProjectProps> = ({ project }) => {
    const { name, client, _id } = project;
    return (
        <div className="border-b p-5">
            <p className="flex-1">
                {name}
                <span className="text-sm text-gray-500 uppercase"> - {client}</span>
            </p>

            <Link to={`${_id}`} className="text-gray-600 hover:to-gray-800 uppercase text-sm font-bold">Go to project</Link>
        </div>
    )
}

export default ProjectCard;