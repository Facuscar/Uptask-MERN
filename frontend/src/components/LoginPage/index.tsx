import axios from "axios";
import { useState, useRef, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "components/Atoms/Alert";
import Input from "components/Atoms/Form/Input";
import SubmitButton from "components/Atoms/Form/SubmitButton";
import TitleWithSpan from "components/Atoms/TitleWithSpan";
import AuthNav from "components/AuthNav";
import { PATH } from "constants/path";
import useAuth from "hooks/useAuth";

import * as S from './styles';

const LoginPage: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const navigate = useNavigate();
    const userContext = useAuth();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if ([emailRef.current?.value, passwordRef.current?.value].includes('')) {
            setShowAlert(true);
            setError(true);
            setMessage('All fields are required');
            return;
        }

        try {
            const { data } = await axios.post<{ msg: string, token: string, _id: string, name: string, email: string }>(`${import.meta.env.VITE_API_USERS_URL}/login`, { email: emailRef.current?.value, password: passwordRef.current?.value });
            localStorage.setItem('token', data.token)
            userContext?.setAuth({
                _id: data._id,
                name: data.name,
                email: data.email,
            });
            navigate('/projects');
        } catch (error: any) {
            setShowAlert(true);
            setError(true);
            setMessage(error.response.data.msg);
        }
    }

    return (
        <>
            <TitleWithSpan title="Log into your account to access your" spanTitle="projects" />
            { showAlert && <Alert message={message} error={error} /> }
            <S.LoginPageForm onSubmit={handleSubmit}>
                <Input type="email" name="Email" placeholder="example@example.com" ref={emailRef} />
                <Input type="password" name="Password" placeholder="Your password" ref={passwordRef} />

                <SubmitButton value="Log in" />
            </S.LoginPageForm>
            <AuthNav leftText="Sign up" leftTo={PATH.REGISTER} rightText="I forgot my password" rightTo={PATH.FORGOT_PASSWORD} />
        </>
    )
}

export default LoginPage;