import { useState, useRef, FormEvent } from "react";

import Alert from "../Atoms/Alert";
import Input from "../Atoms/Form/Input";
import Select from "../Atoms/Form/Select";
import SubmitButton from "../Atoms/Form/SubmitButton";


const TaskForm: React.FC = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const priorityRef = useRef<HTMLSelectElement>(null);
    
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const OPTIONS = ["Low", "Medium", "High"];

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(!nameRef.current?.value)
        console.log(descriptionRef.current?.value)
        console.log(priorityRef.current?.value)
        if (nameRef.current === null || descriptionRef.current === null || priorityRef.current === null) return;

        const name = nameRef.current.value;
        const description = descriptionRef.current.value;
        const priority = priorityRef.current.value;

        if ([name, description, priority].includes('')) {
            setError(true);
            setMessage("All fields are required");
            setShowAlert(true);
        }
    }

    return (
        <>
            {showAlert && <Alert message={message} error={error} />}
            <form className="my-10" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <Input name="Task name" id="name" type="text" placeholder="Validate UX design in figma" ref={nameRef} />
                    <Input name="Task description" id="description" type="text" placeholder="Make sure the buttons and inputs are properly aligned" ref={descriptionRef} />
                    <Select name="Task priority" id="priority" options={OPTIONS} ref={priorityRef} />

                    <SubmitButton value="Create task" />
                </div>
            </form>
        </>
    );
    
}

export default TaskForm;