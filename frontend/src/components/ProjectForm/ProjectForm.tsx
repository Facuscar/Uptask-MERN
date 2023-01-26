import { useRef } from "react";

import Input from "../Atoms/Form/Input";
import SubmitButton from '../Atoms/Form/SubmitButton';

const ProjectForm: React.FC = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const dueDateRef = useRef<HTMLInputElement>(null);
    const clientRef = useRef<HTMLInputElement>(null);

    return (
        <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg">
            <Input type="text" name="Project name" placeholder="Online Store" id="project_name" ref={nameRef} />
            <Input type="text" name="Description" placeholder="Build an online store for my client" id="description" ref={descriptionRef} />
            <Input type="date" name="Due date" id="due_date" ref={dueDateRef} />
            <Input type="text" name="Client's name" placeholder="Uncle Joe" id="client" ref={clientRef} />

            <SubmitButton value="Create project" />

        </form>
    )
};

export default ProjectForm;