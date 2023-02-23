import { useState } from "react";

import ConfirmDelete from "components/ProjectPage/components/ConfirmDelete";
import Modal from "components/ProjectPage/components/Modal";
import Task from "components/ProjectPage/components/Tasks/components/Task";
import { Task as TaskType } from "types/Task";

type TaskListProps = {
    deleteTask: () => void;
    setCurrentTask: (task: TaskType) => void;
    setShowModal: (v: boolean) => void;
    tasks: TaskType[];
};

const TaskList: React.FC<TaskListProps> = ({ tasks, setShowModal, setCurrentTask, deleteTask }) => {
    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const handleDelete = () => {
        deleteTask();
        setDeleteModal(false);
    }

    return (
        <>
            <Modal showModal={deleteModal} setShowModal={setDeleteModal} title="Delete task">
                <ConfirmDelete setShowModal={setDeleteModal} deleteUnit={handleDelete} />
            </Modal>
            {tasks.map(task => (
                <Task 
                    task={task} 
                    key={task._id} 
                    setShowModal={setShowModal} 
                    setCurrentTask={setCurrentTask}
                    setDeleteModal={setDeleteModal}
                />
            ))}
        </>
    );
}

export default TaskList;