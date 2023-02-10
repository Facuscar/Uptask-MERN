import { useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";

import ContributorForm from "./components/ContributorForm";

import { getProject } from "../../utils/getProject";
import { Project } from "../../types/Project";

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
            setProject(data);
        }
        loadProject();
    }, [])


    const submitContributor = (contributorEmail: string) => {
        console.log(contributorEmail);
    }

    if (!project) return <>This skeleton</>;

    return (
        <>
            <h1 className="text-4xl font-black text-center">{`Add contributor to ${project.name}`}</h1>

            <div className="mt-10 flex justify-center">
                <ContributorForm submitContributor={submitContributor} />
            </div>
        </>
    );
};

export default NewContributorPage;