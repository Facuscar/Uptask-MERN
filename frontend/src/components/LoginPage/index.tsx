import axios from "axios";
import { useState, useRef, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "components/Atoms/Alert";
import Input from "components/Atoms/Form/Input";
import SubmitButton from "components/Atoms/Form/SubmitButton";
import TitleWithSpan from "components/Atoms/TitleWithSpan";
import AuthNav from "components/AuthNav";
import { PATH } from "constants/path";
import { useAuth } from "context/AuthProvider";

import * as S from './styles';

type LoginResponse = {
    msg: string, 
    token: string, 
    _id: string, 
    name: string, 
    email: string,
}

const LoginPage: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!emailRef.current || !passwordRef.current) return;

        const email = emailRef.current.value;
        const password = emailRef.current.value;

        if ([email, password].includes('')) {
            setShowAlert(true);
            setError(true);
            setMessage('All fields are required');
            return;
        }

        try {
            const { data } = await axios.post<LoginResponse>(`${import.meta.env.VITE_API_USERS_URL}/login`, { email, password });

            const { _id, name, token } = data; 

            localStorage.setItem('token', token)

            setAuth({
                _id,
                name,
                email,
            });

            navigate('/projects');
        } catch (error: any) {
            setShowAlert(true);
            setError(true);
            if (!error.response) {
                setMessage('Oops.. something went wrong');
                return;
            }
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