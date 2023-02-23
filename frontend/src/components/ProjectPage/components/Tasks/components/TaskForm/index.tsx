import { useState, useRef, FormEvent } from "react";

import Alert from "components/Atoms/Alert";
import Input from "components/Atoms/Form/Input";
import Select from "components/Atoms/Form/Select";
import SubmitButton from "components/Atoms/Form/SubmitButton";
import { Task, Priority } from "types/Task";

import * as S from './styles';

type TaskFormProps = {
    submitTask: (task: Task) => void;
    projectId: string;
    task?: Task;
};

const TaskForm: React.FC<TaskFormProps> = ({ submitTask, projectId, task }) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const dueDateRef = useRef<HTMLInputElement>(null);
    const priorityRef = useRef<HTMLSelectElement>(null);
    
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const OPTIONS = ["Low", "Medium", "High"];
    
    const formatDate = (date: string | undefined) => {
        if (date) return date.split('T')[0];
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
        // Refactor Task / Project Types logic (regarding option field ID)
        const newTask: Task = {
            name,
            description,
            dueDate,
            priority,
            state: false,
            project: projectId,
            _id: task?._id
        }

        submitTask(newTask);
    }

    return (
        <>
            {showAlert && <Alert message={message} error={error} />}
            <S.Form onSubmit={handleSubmit}>
                <S.Wrapper>
                    <Input 
                        name="Task name" 
                        id="name" 
                        type="text" 
                        placeholder="Validate UX design in figma" 
                        ref={nameRef} 
                        defaultValue={task?.name} 
                    />
                    <Input 
                        name="Task description" 
                        id="description" 
                        type="text" 
                        placeholder="Make sure the buttons and inputs are properly aligned" 
                        ref={descriptionRef} 
                        defaultValue={task?.description} 
                    />
                    <Input 
                        name="Due date" 
                        id="due_date" 
                        type="date" 
                        ref={dueDateRef} 
                        defaultValue={formatDate(task?.dueDate)} 
                    />
                    <Select 
                        name="Task priority" 
                        id="priority" 
                        options={OPTIONS} 
                        ref={priorityRef}
                        defaultValue={task?.priority} 
                    />

                    <SubmitButton value={task ? 'Update Task': 'Create Task'} />
                </S.Wrapper>
            </S.Form>
        </>
    );
    
}

export default TaskForm;