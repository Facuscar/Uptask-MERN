import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "components/Atoms/Alert";
import { PATH } from "constants/path";
import { Contributor } from "types/Contributor";
import { getConfig } from "utils/getConfig";

import ContributorList from "./components/ContributorList";

import * as S from './styles';

type ContributorsProps = {
    projectId: string;
    projectContributors: Contributor[];
}

const Contributors: React.FC<ContributorsProps> = ({ projectId, projectContributors }) => {
    const [contributors, setContributors] = useState<Contributor[]>(projectContributors);
    const [currentContributor, setCurrentContributor] = useState<Contributor>();

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);


    const navigate = useNavigate();

    const deleteContributor = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }        
            const { data } = await axios.post<{ msg: string }>(
                `${import.meta.env.VITE_API_PROJECTS_URL}/delete-contributor/${projectId}`, 
                { id: currentContributor?._id }, 
                getConfig(token),
            );

            setContributors( prevContributor => {
                return prevContributor.filter( contributor => contributor._id !== currentContributor?._id)
            })

            setError(false);
            setMessage(data.msg);

        } catch (error: any) {
            setError(true);
            setMessage(error.response.data.msg);
        } finally {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000)
        }
    }

    return (
        <>
            {/* refactor this component with styles.tsx */}
            {showAlert && <Alert message={message} error={error} /> }
            <S.HeaderWrapper>
                <S.HeaderTitle>Contributors</S.HeaderTitle>
                <S.HeaderLink 
                    to={`${PATH.NEW_CONTRIBUTOR}/${projectId}`} 
                >
                    Add contributor
                </S.HeaderLink>
            </S.HeaderWrapper>
            <S.ContributorListWrapper>
                {contributors.length > 0
                    ? <ContributorList contributors={contributors} setCurrentContributor={setCurrentContributor} deleteContributor={deleteContributor} />
                    : <S.NoContributorsText>This project doesn't have any contributors</S.NoContributorsText>
                }
            </S.ContributorListWrapper>
        </>
    );
}

export default Contributors;