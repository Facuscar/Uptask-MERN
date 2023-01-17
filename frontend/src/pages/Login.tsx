import axios from "axios";
import { useState, useRef, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import Alert from "../components/Alert";
import Input from "../components/Form/Input";
import SubmitButton from "../components/Form/SubmitButton";
import { PATH } from "../constants/path";
import useAuth from "../hooks/useAuth";

const Login: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

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
            const { data } = await axios.post<{ msg: string, token: string }>(`${import.meta.env.VITE_API_USERS_URL}/login`, { email: emailRef.current?.value, password: passwordRef.current?.value });
            localStorage.setItem('token', data.token)
        } catch (error: any) {
            setShowAlert(true);
            setError(true);
            setMessage(error.response.data.msg);
        }
    }

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl">Reset your account to access your <span className="text-slate-700">projects</span></h1>
            { showAlert && <Alert message={message} error={error} /> }
            <form action="" className="my-10 bg-white shadow rounded-lg p-10" onSubmit={e => handleSubmit(e)}>
                <Input type="email" name="Email" placeholder="example@example.com" ref={emailRef} />
                <Input type="password" name="Password" placeholder="Your password" ref={passwordRef} />

                <SubmitButton value="Log in" />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to={PATH.REGISTER} >Sign up</Link>
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to={PATH.FORGOT_PASSWORD} >I forgot my password</Link>
            </nav>
        </>
    )
}

export default Login;