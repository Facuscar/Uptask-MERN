import axios from "axios";
import { useState, useRef, FormEvent } from "react";

import Alert from "components/Atoms/Alert";
import Input from "components/Atoms/Form/Input";
import SubmitButton from "components/Atoms/Form/SubmitButton";
import TitleWithSpan from "components/Atoms/TitleWithSpan";
import AuthNav from "components/AuthNav";
import { PATH } from "constants/path";

import * as S from './styles';

const ForgotPasswordPage: React.FC = () => {

    const emailRef = useRef<HTMLInputElement>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = emailRef.current?.value
        if (!email) {
            setShowAlert(true);
            setMessage('The email field is required');
            setError(true);

            return;
        }

        try {
            const { data } = await axios.post<{ msg: string }>(`${import.meta.env.VITE_API_USERS_URL}/forgot-password`, { email })
            setShowAlert(true);
            setMessage(data.msg);
            setError(false);

            (e.target as HTMLFormElement).reset()
        } catch (error: any) {
            setShowAlert(true);
            setMessage(error.response.data.msg);
            setError(true);
        }
    };

    return (
        <>
            <TitleWithSpan title="Reset your account to access your" spanTitle="projects" />
            {showAlert && <Alert message={message} error={error} /> }
            <S.ForgotPasswordForm onSubmit={handleSubmit}>
                <Input type="email" name="Email" placeholder="example@example.com" ref={emailRef} />
                <SubmitButton value="Send the email" />
            </S.ForgotPasswordForm>
            <AuthNav leftText="Sign in" leftTo={PATH.LOGIN} rightText="Sign up" rightTo={PATH.REGISTER} />
        </>
    )
}

export default ForgotPasswordPage;