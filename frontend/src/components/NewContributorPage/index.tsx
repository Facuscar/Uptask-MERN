import axios from "axios";
import { useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";

import ContributorForm from "./components/ContributorForm";

import { getProject } from "../../utils/getProject";
import { getConfig } from "../../utils/getConfig";
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


    const submitContributor = async (contributorEmail: string) => {
        
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }

            const { data } = await axios.post<{msg: string}>(`${import.meta.env.VITE_API_PROJECTS_URL}/contributor`, {email: contributorEmail}, getConfig(token));

            return {
                message: data.msg,
                error: false,
            };
            
        } catch (error: any) {
            return {
                message: error.response.data.msg,
                error: true
            };
        }
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