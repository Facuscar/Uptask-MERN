import { useState, useRef, FormEvent } from "react";

import Alert from "../../Atoms/Alert";
import Input from "../../Atoms/Form/Input";
import SubmitButton from "../../Atoms/Form/SubmitButton";

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

        setError(false);
        const email = emailRef.current.value;
        const response = await submitContributor(email);
        if (!response) return;
        setMessage(response.message);
        setError(response.error);
        setShowAlert(true);
    }

    return (
        <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow" onSubmit={e => handleSubmit(e)}>
            { showAlert && <Alert message={message} error={error} /> }
            <Input name="Contributor email" type="enail" id="contributor_email" placeholder="example@example.com" ref={emailRef}/>

            <SubmitButton value="Find contributor" />
        </form>
    );
};

export default ContributorForm;