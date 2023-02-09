import { Task as TaskType } from "../../../types/Task";
import { formatDate } from "../../../utils/formatDate";

type TaskProps = {
    setCurrentTask: (task: TaskType) => void;
    setShowModal: (v: boolean) => void;
    setShowDeleteModal: (v: boolean) => void;
    task: TaskType;
};

const Task: React.FC<TaskProps> = ({ task, setShowModal, setCurrentTask, setShowDeleteModal }) => {
    const { description, name, dueDate, priority, state } = task

    const handleClick = () => {
        setShowModal(true);
        setCurrentTask(task);
    }

    const handleDeleteClick = () => {
        setShowModal(true);
        setShowDeleteModal(true);
    }

    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div>
                <p className="mb-1 text-xl">{name}</p>
                <p className="mb-1 text-sm text-gray-500 uppercase">{description}</p>
                <p className="mb-1 text-xl">{formatDate(dueDate)}</p>
                <p className="mb-1 text-gray-600">Priority: {priority}</p>
            </div>
            <div className="flex gap-2">
                <button className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg" onClick={handleClick} >Edit</button>
                <button>{state ? 'Complete' : 'Completed'}</button>
                <button className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg" onClick={handleDeleteClick}>Delete</button>
            </div>
        </div>
    );
}

export default Task;