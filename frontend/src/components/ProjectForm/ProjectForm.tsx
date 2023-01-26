import { useState ,useRef, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants/path";

import useProjects from "../../hooks/useProjects";

import Alert from "../Atoms/Alert";
import Input from "../Atoms/Form/Input";
import SubmitButton from '../Atoms/Form/SubmitButton';

const ProjectForm: React.FC = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const dueDateRef = useRef<HTMLInputElement>(null);
    const clientRef = useRef<HTMLInputElement>(null);

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const navigate = useNavigate();

    const ProjectContext = useProjects();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!nameRef.current?.value || !descriptionRef.current?.value || !dueDateRef.current?.value || !clientRef.current?.value) return;

        if ([nameRef.current.value, descriptionRef.current.value, dueDateRef.current.value, clientRef.current.value].includes('')) {
            setMessage('All fields are required.');
            setError(true);
            setShowAlert(true);
            return;
        }

        const project = {
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            dueDate:  dueDateRef.current.value,
            client: clientRef.current.value,
        }

        const response = await ProjectContext?.submitProject(project);
        setShowAlert(true)

        if (response && !response.success) {
            setMessage(response.message);
            setError(true);
            return;
        }

        (e.target as HTMLFormElement).reset()

        if(response) {
            setMessage(response.message);
            setError(false);
        }

        setShowAlert(true);

        setTimeout(() => {
            navigate(PATH.PROJECTS);
        }, 3000);
    };

    return (
        <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg" onSubmit={e => handleSubmit(e)}>
            { showAlert && <Alert error={error} message={message} /> }
            <Input type="text" name="Project name" placeholder="Online Store" id="project_name" ref={nameRef} />
            <Input type="text" name="Description" placeholder="Build an online store for my client" id="description" ref={descriptionRef} />
            <Input type="date" name="Due date" id="due_date" ref={dueDateRef} />
            <Input type="text" name="Client's name" placeholder="Uncle Joe" id="client" ref={clientRef} />

            <SubmitButton value="Create project" />

        </form>
    );
};

export default ProjectForm;