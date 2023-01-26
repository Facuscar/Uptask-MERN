import axios from "axios";
import { useState, useEffect, useRef, FormEvent  }from "react";
import { Link, useParams } from "react-router-dom";

import { PATH } from "../constants/path";
import Alert from "../components/Atoms/Alert";
import Input from "../components/Atoms/Form/Input";
import SubmitButton from "../components/Atoms/Form/SubmitButton";

const NewPassword: React.FC = () => {
    const params = useParams();
    const { token } = params;

    const passwordRef = useRef<HTMLInputElement>(null);
    const secondPasswordRef = useRef<HTMLInputElement>(null);

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(true);

    useEffect(() => {
        const validateToken = async () => {
            try {
                await axios.get<{ msg: string }>(`${import.meta.env.VITE_API_USERS_URL}/forgot-password/${token}`);
            } catch (error: any) {
                setShowAlert(true);
                setMessage(error.response.data.msg);
                setError(true);
                setShowForm(false);
            }
        };

        validateToken();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (passwordRef.current && passwordRef.current.value.length < 6) {
            setShowAlert(true);
            setMessage('The password must have at least 6 characters');
            setError(true);
            return;
        }

        if (passwordRef.current?.value !== secondPasswordRef.current?.value) {
            setShowAlert(true);
            setMessage('The passwords do not match');
            setError(true);
            return;
        }

        try {
            const url = `${import.meta.env.VITE_API_USERS_URL}/forgot-password/${token}`

            const { data } = await axios.post<{ msg: string }>(url, { password: passwordRef.current?.value });

            console.log(data);
            setError(false);
            setMessage(data.msg);
        } catch (error: any) {
            setError(true);
            setMessage(error.response.data.msg);
        } finally {
            setShowAlert(true);
            setShowForm(false);
        }
    }

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl">Create your account and <span className="text-slate-700">projects</span></h1>
                { showAlert && <Alert message={message} error={error} /> }
                { showForm ? ( 
                    <form action="" className="my-10 bg-white shadow rounded-lg p-10" onSubmit={e => handleSubmit(e)}>
                    <Input type="password" name="New Password" placeholder="New password" id="password" ref={passwordRef} />
                    <Input type="password" name="Repeat your new password" placeholder="Repeat your new password" id="second_password" ref={secondPasswordRef} />

                    <SubmitButton value="Reset your password" />
                    </form>
                ) : (
                    <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to={PATH.LOGIN} >Log in</Link>
                )}
        </>
    )
}

export default NewPassword;