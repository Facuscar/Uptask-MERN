import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Alert from "../Atoms/Alert";
import TitleWithSpan from "../Atoms/TitleWithSpan";

import { PATH } from "../../constants/path";

const ConfirmAccountPage: React.FC = () => {
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
            }
        }
        confirmAccount();
    }, []);

    return (
        <>
            <TitleWithSpan title="Confirm your account to create your" spanTitle="projects" />
            <div className="mt-20 md:mt-5 shadow:lg px-5 py-10 rounded-xl bg-white">
                <Alert message={message} error={error} />
                { !error && <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to={PATH.LOGIN} >Log in</Link>}
            </div>
        </>
    )
}

export default ConfirmAccountPage;