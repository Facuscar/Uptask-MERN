import axios from "axios";
import { useState, useEffect, useRef  }from "react";
import { Link, useParams } from "react-router-dom";

import Alert from "../components/Alert";
import Input from "../components/Form/Input";
import SubmitButton from "../components/Form/SubmitButton";

const NewPassword: React.FC = () => {
    const params = useParams();
    const { token } = params;

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const validateToken = async () => {
            try {
                const { data } = await axios.get<{ msg: string }>(`${import.meta.env.VITE_API_USERS_URL}/forgot-password/${token}`);
                
            } catch (error: any) {
                console.log(error);
                
                setShowAlert(true);
                setMessage(error.response.data.msg);
                setError(true);
            }
        };

        validateToken();
    }, []);

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl">Create your account and <span className="text-slate-700">projects</span></h1>
            { showAlert && error ? <Alert message={message} error={error} /> : (
                <form action="" className="my-10 bg-white shadow rounded-lg p-10">
                <Input type="password" name="New Password" placeholder="New password" id="password" />
                <Input type="password" name="Repeat your new password" placeholder="Repeat your new password" id="second_password" />

                <SubmitButton value="Reset your password" />
                </form>
            )}
            
        </>
    )
}

export default NewPassword;