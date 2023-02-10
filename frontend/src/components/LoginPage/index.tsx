import axios from "axios";
import { useState, useRef, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import Alert from "../Atoms/Alert";
import Input from "../Atoms/Form/Input";
import SubmitButton from "../Atoms/Form/SubmitButton";
import TitleWithSpan from "../Atoms/TitleWithSpan";
import AuthNav from "../AuthNav";

import { PATH } from "../../constants/path";
import useAuth from "../../hooks/useAuth";

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
            <form action="" className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
                <Input type="email" name="Email" placeholder="example@example.com" ref={emailRef} />
                <Input type="password" name="Password" placeholder="Your password" ref={passwordRef} />

                <SubmitButton value="Log in" />
            </form>
            <AuthNav leftText="Sign up" leftTo={PATH.REGISTER} rightText="I forgot my password" rightTo={PATH.FORGOT_PASSWORD} />
        </>
    )
}

export default LoginPage;