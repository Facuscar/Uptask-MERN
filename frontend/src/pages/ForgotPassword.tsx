import axios from "axios";
import { useState, useRef, FormEvent } from "react";
import { Link } from "react-router-dom";

import Alert from "../components/Alert";
import Input from "../components/Form/Input";
import SubmitButton from "../components/Form/SubmitButton";
import { PATH } from "../constants/path";

const ForgotPassword: React.FC = () => {

    const emailRef = useRef<HTMLInputElement>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
            <h1 className="text-sky-600 font-black text-6xl">Reset your account to access your <span className="text-slate-700">projects</span></h1>
            {showAlert && <Alert message={message} error={error} /> }
            <form action="" className="my-10 bg-white shadow rounded-lg p-10" onSubmit={(e) => onSubmit(e)}>
                <Input type="email" name="Email" placeholder="example@example.com" ref={emailRef} />

                <SubmitButton value="Send the email" />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to={PATH.LOGIN} >Log in</Link>
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to={PATH.REGISTER}>Register</Link>
            </nav>
        </>
    )
}

export default ForgotPassword;