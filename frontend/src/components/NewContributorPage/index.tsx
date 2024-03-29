import { useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";

import ProjectTitle from "components/Atoms/ProjectTitle";
import { getProject } from "utils/getProject";
import { Project } from "types/Project";

import ContributorSection from "./components/Contributor";

import Skeleton from "./Skeleton";


const NewContributorPage: React.FC = () => {
    const [project, setProject] = useState<Project>();

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const loadProject = async () => {
            const data = await getProject(params.id);
            if (!data) {
                navigate('/');
                return;
            }
            setProject(data.project);
        }
        loadProject();
    }, [])

    if (!project) return (
        <Skeleton />
    );

    const { name } = project;

    return (
        <>
            <ProjectTitle title={`Add contributor to ${name}`} />
            <ContributorSection project={project} />
        </>
    );
};

export default NewContributorPage;