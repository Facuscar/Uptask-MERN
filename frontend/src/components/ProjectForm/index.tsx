import { useState ,useRef, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "components/Atoms/Alert";
import Input from "components/Atoms/Form/Input";
import SubmitButton from 'components/Atoms/Form/SubmitButton';
import { PATH } from "constants/path";
import { useProjects } from "context/ProjectProvider";
import { Project, NewProject } from "types/Project";

import * as S from './styles';

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
    
    const isEditing = project !== undefined;

    const navigate = useNavigate();

    const { editProject, submitProject } = useProjects();

    const formatDate = (date: string | undefined) => {
        if (date) return date.split('T')[0];
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!nameRef.current?.value || !descriptionRef.current?.value || !dueDateRef.current?.value || !clientRef.current?.value) return;

        const name = nameRef.current.value;
        const description = descriptionRef.current.value;
        const dueDate = dueDateRef.current.value;
        const client = clientRef.current.value;

        if ([name, description, dueDate, client].includes('')) {
            setMessage('All fields are required.');
            setError(true);
            setShowAlert(true);
            return;
        }

        const newProject: NewProject = {
            name,
            description,
            dueDate,
            client,
        }

        if (isEditing) newProject._id = project._id;
        

        const response = isEditing 
        ? await editProject(newProject) 
        : await submitProject(newProject);

        setShowAlert(true)

        if (response && !response.success) {
            setMessage(response.message);
            setError(true);
            return;
        }

        nameRef.current.value = '';
        descriptionRef.current.value = '';
        dueDateRef.current.value = '';
        clientRef.current.value = '';

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
        <S.Form onSubmit={handleSubmit}>
            { showAlert && <Alert error={error} message={message} /> }
            <Input type="text" name="Project name" placeholder="Online Store" id="project_name" ref={nameRef} defaultValue={project?.name} />
            <Input type="text" name="Description" placeholder="Build an online store for my client" id="description" ref={descriptionRef} defaultValue={project?.description} />
            <Input type="date" name="Due date" id="due_date" ref={dueDateRef} defaultValue={formatDate(project?.dueDate)} />
            <Input type="text" name="Client's name" placeholder="Uncle Joe" id="client" ref={clientRef} defaultValue={project?.client} />

            <SubmitButton value={isEditing ? "Update project" : "Create project"} />
        </S.Form>
    );
};

export default ProjectForm;