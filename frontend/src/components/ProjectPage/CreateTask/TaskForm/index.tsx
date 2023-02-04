import axios from "axios";
import { useState, useRef, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "../../../Atoms/Alert";
import Input from "../../../Atoms/Form/Input";
import Select from "../../../Atoms/Form/Select";
import SubmitButton from "../../../Atoms/Form/SubmitButton";

import { Task, Priority } from "../../../../types/Task";

type TaskFormProps = {
    project: string;
};

const TaskForm: React.FC<TaskFormProps> = ({ project }) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const dueDateRef = useRef<HTMLInputElement>(null);
    const priorityRef = useRef<HTMLSelectElement>(null);
    
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const navigate = useNavigate();

    const OPTIONS = ["Low", "Medium", "High"];

    const createTask = async (task : Task) => {
        try {
            const token = localStorage.getItem('token');
            if(!token) navigate('/');

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axios.post(import.meta.env.VITE_API_TASKS_URL, task, config)
            console.log(data);

        } catch (error: any) {
            console.log(error); 
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(!nameRef.current?.value)
        console.log(descriptionRef.current?.value)
        console.log(priorityRef.current?.value)
        if (nameRef.current === null || descriptionRef.current === null || priorityRef.current === null || dueDateRef.current === null) return;

        const name = nameRef.current.value;
        const description = descriptionRef.current.value;
        const dueDate = dueDateRef.current.value;
        const priority = priorityRef.current.value as Priority;

        if ([name, description, dueDate, priority].includes('')) {
            setError(true);
            setMessage("All fields are required");
            setShowAlert(true);
        }

        const task: Task = {
            name,
            description,
            dueDate,
            priority,
            state: false,
            project,
        }

        createTask(task);
    }

    return (
        <>
            {showAlert && <Alert message={message} error={error} />}
            <form className="my-10" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <Input name="Task name" id="name" type="text" placeholder="Validate UX design in figma" ref={nameRef} />
                    <Input name="Task description" id="description" type="text" placeholder="Make sure the buttons and inputs are properly aligned" ref={descriptionRef} />
                    <Input name="Due date" id="due_date" type="date" ref={dueDateRef} />
                    <Select name="Task priority" id="priority" options={OPTIONS} ref={priorityRef} />

                    <SubmitButton value="Create task" />
                </div>
            </form>
        </>
    );
    
}

export default TaskForm;