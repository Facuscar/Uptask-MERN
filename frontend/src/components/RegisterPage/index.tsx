import RegisterForm from "./components/RegisterForm";

import TitleWithSpan from "components/Atoms/TitleWithSpan";
import AuthNav from "components/AuthNav";
import { PATH } from "constants/path";

const RegisterPage: React.FC = () => {

    return (
        <>
            <TitleWithSpan title="Create your account and" spanTitle="projects" />
            
            <RegisterForm />

            <AuthNav leftText="Sign in" leftTo={PATH.LOGIN} rightText="I forgot my password" rightTo={PATH.FORGOT_PASSWORD} />
        </>
    )
}

export default RegisterPage;