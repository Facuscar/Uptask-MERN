import axios, { AxiosError } from "axios";
import { useState, useRef, FormEvent } from "react";
import { Link } from "react-router-dom";

import Alert from "../components/Alert";
import Input from "../components/Form/Input";
import SubmitButton from "../components/Form/SubmitButton";
import { PATH } from "../constants/path";

const Register: React.FC = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const secondPasswordRef = useRef<HTMLInputElement>(null);

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if ([emailRef.current?.value, nameRef.current?.value, passwordRef.current?.value, secondPasswordRef.current?.value].includes('')) {
            setMessage('All fields are required')
            setShowAlert(true);
            setError(true);
            return;
        }

        if (passwordRef.current?.value !== secondPasswordRef.current?.value) {
            setMessage('The passwords do not match');
            setShowAlert(true);
            setError(true);
            return;
        }

        if (passwordRef.current && passwordRef.current.value.length < 6) {
            setMessage('The password must have at least 6 characters');
            setShowAlert(true);
            setError(true);
            return;
        }

        setShowAlert(false);
        
        const createUser = async () => {
            try {
                const response = await axios.post<{ msg: string }>(`${import.meta.env.VITE_API_URL}`, { name: emailRef.current?.value, email: emailRef.current?.value, password: passwordRef.current?.value });
                setShowAlert(true);
                setMessage(response.data.msg);
                setError(false);
                (e.target as HTMLFormElement).reset()
            } catch (error: any) {
                setShowAlert(true);
                setMessage(error.response.data?.msg);
                setError(true);
            }
        }

        createUser();
    }

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl">Create your account and <span className="text-slate-700">projects</span></h1>

            {showAlert && <Alert message={message} error={error} />}

            <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={e => onSubmit(e)} >
                <Input type="email" name="Email" placeholder="example@example.com" ref={emailRef} />
                <Input type="text" name="Name" placeholder="Your name" ref={nameRef} />
                <Input type="password" name="Password" placeholder="Your password" ref={passwordRef} />
                <Input type="password" name="Repeat the password" placeholder="Repeat your password" id="second_password" ref={secondPasswordRef} />

                <SubmitButton value="Create your account" />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to={PATH.LOGIN} >Log in</Link>
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to={PATH.FORGOT_PASSWORD} >I forgot my password</Link>
            </nav>
        </>
    )
}

export default Register;