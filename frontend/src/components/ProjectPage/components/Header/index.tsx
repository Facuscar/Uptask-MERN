import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Alert from "../../../Atoms/Alert";
import DeleteIcon from "../../../Atoms/DeleteIcon";
import EditIcon from "../../../Atoms/EditIcon";
import ProjectTitle from "../../../Atoms/ProjectTitle";

import { PATH } from "../../../../constants/path";
import { getConfig } from "../../../../utils/getConfig";

import * as S from './styles';

type HeaderProps = {
    name: string;
    projectId: string;
};

const Header: React.FC<HeaderProps> = ({ name, projectId }) => {
    const navigate = useNavigate();

    const deleteProject = async () => {
        try {
            const token = localStorage.getItem('token');

            if(!token) {
                navigate('/');
                return;
            }

            const { data } = await axios.delete<{msg: string}>(`${import.meta.env.VITE_API_PROJECTS_URL}/${projectId}`, getConfig(token));

            navigate(PATH.PROJECTS);
        } catch (error: any) {
            setError(true);
            setMessage(error.response.data.msg);
        } finally {
            setShowAlert(true);
        }
    };

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    return (
        <>
            {showAlert && <Alert message={message} error={error} />}
            <S.HeaderWrapper>
                <ProjectTitle title={name} />
                <S.IconsWrapper>
                    <S.IconWrapper>
                        <EditIcon />
                        <Link to={`${PATH.EDIT_PROJECT}/${projectId}`} className="uppercase font-bold">Edit</Link>
                    </S.IconWrapper>
                    <S.IconWrapper>
                        <DeleteIcon />
                        {/* Refactor into button with variants component */}
                        <button className="uppercase font-bold" onClick={deleteProject}>Delete</button>
                    </S.IconWrapper>
                </S.IconsWrapper>
            </S.HeaderWrapper>
        </>
    );
};

export default Header;