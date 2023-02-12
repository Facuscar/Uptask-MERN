import axios from "axios";
import { useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";

import ContributorCard from "./components/ContributorCard";
import ContributorForm from "./components/ContributorForm";

import { getProject } from "../../utils/getProject";
import { getConfig } from "../../utils/getConfig";
import { Contributor } from "../../types/Contributor";
import { Project } from "../../types/Project";

type GetContributorResponse = {
    msg: string;
    user?: {
        _id: string;
        email: string;
        name: string;
    };   
};

const NewContributorPage: React.FC = () => {
    const [project, setProject] = useState<Project>();
    const [isLoading, setIsLoading] = useState<boolean>();
    const [contributor, setContributor] = useState<Contributor>();

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

            setIsLoading(true);
            const { data } = await axios.post<GetContributorResponse>(`${import.meta.env.VITE_API_PROJECTS_URL}/contributor`, {email: contributorEmail}, getConfig(token));
            console.log(data);
            
            if (data.user) {
                const {name, _id, email} = data.user;
                setContributor({
                    name,
                    _id,
                    email,
                })
            }

            return {
                message: data.msg,
                error: false,
            };

        } catch (error: any) {
            return {
                message: error.response.data.msg,
                error: true
            };
        } finally {
            setIsLoading(false);
        }
    };

    const addContributor = async () => {
        console.log('i was clicked');
    }

    if (!project) return <>This skeleton</>;

    return (
        <>
            <h1 className="text-4xl font-black text-center">{`Add contributor to ${project.name}`}</h1>

            <div className="mt-10 flex justify-center">
                <ContributorForm submitContributor={submitContributor} />
            </div>

            {isLoading ? 'contributor skeleton' : contributor?._id && <ContributorCard contributor={contributor} addContributor={addContributor} />}
        </>
    );
};

export default NewContributorPage;