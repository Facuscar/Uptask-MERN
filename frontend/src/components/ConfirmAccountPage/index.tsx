import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alert from "components/Atoms/Alert";
import TitleWithSpan from "components/Atoms/TitleWithSpan";
import { PATH } from "constants/path";

import * as S from './styles';

const ConfirmAccountPage: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const params = useParams();
    const { token } = params;

    useEffect(() => {
        const confirmAccount = async () => {
            try {
                const url = `${import.meta.env.VITE_API_USERS_URL}/confirm/${token}`;
                const { data } = await axios.get<{ msg: string }>(url);
                setMessage(data.msg);
                setError(false);
            } catch (error: any) {
                setMessage(error.response.data.msg);
                setError(true);
            }
        }
        confirmAccount();
    }, []);

    return (
        <>
            <TitleWithSpan title="Confirm your account to create your" spanTitle="projects" />
            <S.BottomWrapper>
                <Alert message={message} error={error} />
                { !error && <S.LogInLink to={PATH.LOGIN}>Log in</S.LogInLink>}
            </S.BottomWrapper>

        </>
    )
}

export default ConfirmAccountPage;