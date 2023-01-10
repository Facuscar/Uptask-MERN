import { Link } from "react-router-dom";

import Input from "../components/Form/Input";
import SubmitButton from "../components/Form/SubmitButton";
import { PATH } from "../constants/path";

const Login: React.FC = () => {
    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl">Reset your account to access your <span className="text-slate-700">projects</span></h1>
            <form action="" className="my-10 bg-white shadow rounded-lg p-10">
                <Input type="email" name="Email" placeholder="example@example.com" />
                <Input type="password" name="Password" placeholder="Your password" />

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