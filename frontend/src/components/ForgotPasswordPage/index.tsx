import axios from "axios";
import { useState, useRef, FormEvent } from "react";
import { Link } from "react-router-dom";

import Alert from "..//Atoms/Alert";
import Input from "../Atoms/Form/Input";
import SubmitButton from "../Atoms/Form/SubmitButton";

import { PATH } from "../../constants/path";

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
            <h1 className="text-sky-600 font-black text-6xl">Reset your account to access your <span className="text-slate-700">projects</span></h1>
            {showAlert && <Alert message={message} error={error} /> }
            <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
                <Input type="email" name="Email" placeholder="example@example.com" ref={emailRef} />

                <SubmitButton value="Send the email" />
            </form>
            {/* TODO: Transform into nav component */}
            <nav className="lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to={PATH.LOGIN} >Log in</Link>
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to={PATH.REGISTER}>Register</Link>
            </nav>
        </>
    )
}

export default ForgotPasswordPage;