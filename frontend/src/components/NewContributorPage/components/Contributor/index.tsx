import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "components/Atoms/Alert";
import { getConfig } from "utils/getConfig";
import { Contributor } from "types/Contributor";
import { Project } from "types/Project";

import ContributorCard from "./components/ContributorCard";
import ContributorForm from "./components/ContributorForm";

import * as S from './styles';

type GetContributorResponse = {
    msg: string;
    user?: {
        _id: string;
        email: string;
        name: string;
    };   
};

const ContributorSection: React.FC<{ project: Project }> = ({ project }) => {

    const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>();
    const [contributor, setContributor] = useState<Contributor>();

    const addContributor = async (e) => {
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

    return (
        <>
            { showAlert &&  <Alert message={message} error={error} /> }
            <S.ContributorFormWrapper>
                <ContributorForm submitContributor={submitContributor} />
            </S.ContributorFormWrapper>

            {isLoading ? 'contributor skeleton' : contributor?._id && <ContributorCard contributor={contributor} addContributor={addContributor} />}
        </>
    );
};

export default ContributorSection;