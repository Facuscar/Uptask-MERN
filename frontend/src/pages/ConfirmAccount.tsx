import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Alert from "../components/Atoms/Alert";
import { PATH } from "../constants/path";

const ConfirmAccount: React.FC = () => {

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const params = useParams();
    const { token } = params;

    useEffect(() => {
        const confirmAccount = async () => {
            try {
                const url = `${import.meta.env.VITE_API_USERS_URL}/confirm/${token}`;
                console.log(url);
                const data = await axios.get<{ msg: string }>(url);
                setMessage(data.data.msg);
                setError(false);
            } catch (error: any) {
                setMessage(error.response.data.msg);
                setError(true);
            } finally {
                setShowAlert(true);
            }
        }
        confirmAccount();
    }, []);

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl">Confirm your account to create your <span className="text-slate-700">projects</span></h1>
            <div className="mt-20 md:mt-5 shadow:lg px-5 py-10 rounded-xl bg-white">
                { showAlert && <Alert message={message} error={error} /> }
                { !error && <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to={PATH.LOGIN} >Log in</Link>}
            </div>
        </>
    )
}

export default ConfirmAccount;