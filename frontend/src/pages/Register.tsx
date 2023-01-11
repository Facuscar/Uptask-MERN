import { useRef, FormEvent } from 'react';
import { Link } from "react-router-dom";

import Input from "../components/Form/Input";
import SubmitButton from "../components/Form/SubmitButton";
import { PATH } from "../constants/path";

const Register: React.FC = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const secondPasswordRef = useRef<HTMLInputElement>(null);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (emailRef.current) {
            console.log({
                email: emailRef.current.value
            });
        }
    }

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl">Create your account and <span className="text-slate-700">projects</span></h1>
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