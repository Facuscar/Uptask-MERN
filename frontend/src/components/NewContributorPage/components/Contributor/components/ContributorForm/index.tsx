import { useState, useRef, FormEvent } from "react";

import Alert from "components/Atoms/Alert";
import Input from "components/Atoms/Form/Input";
import SubmitButton from "components/Atoms/Form/SubmitButton";

import * as S from './styles';

type ContributorFormProps = {
    submitContributor: (email: string) => Promise <{ error: boolean, message: string } | undefined>;
};

const ContributorForm: React.FC<ContributorFormProps> = ({ submitContributor }) => {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const emailRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!emailRef.current?.value) {
            setShowAlert(true);
            setError(true);
            setMessage('This field is required');
            return;
        } 

        const email = emailRef.current.value;
        const response = await submitContributor(email);
        if (!response) return;
        setMessage(response.message);
        setError(response.error);
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
        }, 3000)
    }

    return (
        <S.SearchForm onSubmit={e => handleSubmit(e)}>
            { showAlert && <Alert message={message} error={error} /> }
            <Input name="Contributor email" type="enail" id="contributor_email" placeholder="example@example.com" ref={emailRef}/>

            <SubmitButton value="Find contributor" />
        </S.SearchForm>
    );
};

export default ContributorForm;