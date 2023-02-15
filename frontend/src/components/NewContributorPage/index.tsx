import axios from "axios";
import { useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";

import ContributorCard from "./components/ContributorCard";
import ContributorForm from "./components/ContributorForm";

import Alert from "../Atoms/Alert";

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

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

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
            setContributor(undefined);
            return {
                message: error.response.data.msg,
                error: true
            };
        } finally {
            setIsLoading(false);
        }
    };

    const addContributor = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }

            if (!project || !contributor) return;

            const { data } = await axios.post<{msg : string}>(
                `${import.meta.env.VITE_API_PROJECTS_URL}/contributor/${project._id}`, 
                { contributor: contributor.email }, 
                getConfig(token)
            );
            setError(false);
            setMessage(data.msg);
        } catch (error: any) {
            setError(true);
            setMessage(error.response.data.msg);
        } finally {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
    }

    if (!project) return <>NewContributor Skeleton</>;

    const { name } = project;

    return (
        <>
            <h1 className="text-4xl font-black text-center">{`Add contributor to ${name}`}</h1>
            { showAlert &&  <Alert message={message} error={error} /> }
            <div className="mt-10 flex justify-center">
                <ContributorForm submitContributor={submitContributor} />
            </div>

            {isLoading ? 'contributor skeleton' : contributor?._id && <ContributorCard contributor={contributor} addContributor={addContributor} />}
        </>
    );
};

export default NewContributorPage;