import { Task } from "../../../types/Task";

type CreateTaskButtonProps = {
    setCurrentTask: (task: Task | undefined) => void;
    setShowModal: (v: boolean) => void;
};

const CreateTaskButton: React.FC<CreateTaskButtonProps> = ({ setShowModal, setCurrentTask }) => {
    const handleClick = () => {
        setShowModal(true);
        setCurrentTask(undefined);
    }

    return (
        <button 
                type="button" 
                className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold text-white text-center bg-sky-400 mt-5 flex gap-2 items-center justify-center"
                onClick={handleClick}
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            New task
        </button>
    );
}

export default CreateTaskButton;