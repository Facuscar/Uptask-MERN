import CreateTaskButton from "./CreateTaskButton";
import TaskForm from "./TaskForm";

import TaskModal from "../../Atoms/TaskModal";

type CreateTaskProps = {
    showModal: boolean;
    setShowModal: (v: boolean) => void;
    projectId: string;
}

const CreateTask: React.FC<CreateTaskProps> = ({ showModal, setShowModal, projectId }) => {
    return (
        <>
            <TaskModal showModal={showModal} setShowModal={setShowModal} title="Create task">
                <TaskForm project={projectId} />
            </TaskModal>
            <CreateTaskButton setShowModal={setShowModal} />
        </>
    );
}

export default CreateTask;