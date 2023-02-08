import CreateTaskButton from "./CreateTaskButton";
import TaskForm from "./TaskForm";

import TaskModal from "../../Atoms/TaskModal";

import { Task } from "../../../types/Task";

type CreateTaskProps = {
    showModal: boolean;
    setShowModal: (v: boolean) => void;
    projectId: string;
    createTask: (task: Task) => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ showModal, setShowModal, projectId, createTask }) => {
    return (
        <>
            <TaskModal showModal={showModal} setShowModal={setShowModal} title="Create task">
                <TaskForm project={projectId} createTask={createTask} />
            </TaskModal>
            <CreateTaskButton setShowModal={setShowModal} />
        </>
    );
}

export default CreateTask;