import axios from "axios";
import { useState, useEffect, useRef, FormEvent  }from "react";
import { useParams } from "react-router-dom";

import Alert from "../Atoms/Alert";
import AuthNavLink from "../Atoms/AuthNavLink";
import Input from "../Atoms/Form/Input";
import SubmitButton from "../Atoms/Form/SubmitButton";
import TitleWithSpan from "../Atoms/TitleWithSpan";

import { PATH } from "../../constants/path";

import * as S from './styles';

const NewPasswordPage: React.FC = () => {
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
            <TitleWithSpan title="Recover your account and" spanTitle="projects"/>
                { showAlert && <Alert message={message} error={error} /> }
                { showForm ? ( 
                    <S.NewPasswordForm onSubmit={e => handleSubmit(e)}>
                    <Input type="password" name="New Password" placeholder="New password" id="password" ref={passwordRef} />
                    <Input type="password" name="Repeat your new password" placeholder="Repeat your new password" id="second_password" ref={secondPasswordRef} />

                    <SubmitButton value="Reset your password" />
                    </S.NewPasswordForm>
                ) : (
                    <AuthNavLink to={PATH.LOGIN} text="Log in" />
                )}
        </>
    )
}

export default NewPasswordPage;