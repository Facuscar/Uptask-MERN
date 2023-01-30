import { useState ,useRef, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants/path";

import useProjects from "../../hooks/useProjects";
import { Project } from "../../types/Project";

import Alert from "../Atoms/Alert";
import Input from "../Atoms/Form/Input";
import SubmitButton from '../Atoms/Form/SubmitButton';

type ProjectFormProps = {
    project?: Project;
};

const ProjectForm: React.FC<ProjectFormProps> = ({ project }) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const dueDateRef = useRef<HTMLInputElement>(null);
    const clientRef = useRef<HTMLInputElement>(null);

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        if (project?._id) setIsEditing(true);    
    }, []);

    const navigate = useNavigate();

    const ProjectContext = useProjects();

    const formatDate = (date: string | undefined) => {
        if (date) return date.split('T')[0];
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!nameRef.current?.value || !descriptionRef.current?.value || !dueDateRef.current?.value || !clientRef.current?.value) return;

        if ([nameRef.current.value, descriptionRef.current.value, dueDateRef.current.value, clientRef.current.value].includes('')) {
            setMessage('All fields are required.');
            setError(true);
            setShowAlert(true);
            return;
        }

        const newProject = {
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            dueDate:  dueDateRef.current.value,
            client: clientRef.current.value,
            _id: isEditing ? project?._id : '',
        }

        const response = isEditing 
        ? await ProjectContext?.editProject(newProject) 
        : await ProjectContext?.submitProject(newProject);

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
            <Input type="text" name="Project name" placeholder="Online Store" id="project_name" ref={nameRef} defaultValue={project?.name} />
            <Input type="text" name="Description" placeholder="Build an online store for my client" id="description" ref={descriptionRef} defaultValue={project?.description} />
            <Input type="date" name="Due date" id="due_date" ref={dueDateRef} defaultValue={formatDate(project?.dueDate)} />
            <Input type="text" name="Client's name" placeholder="Uncle Joe" id="client" ref={clientRef} defaultValue={project?.client} />

            <SubmitButton value={isEditing ? "Update project" : "Create project"} />

        </form>
    );
};

export default ProjectForm;