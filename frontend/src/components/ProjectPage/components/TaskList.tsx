import { useState } from "react";

import ConfirmDelete from "./ConfirmDelete";
import Modal from "./Modal";
import Task from "./Task";

import { Task as TaskType } from "../../../types/Task";

type TaskListProps = {
    deleteTask: () => void;
    setCurrentTask: (task: TaskType) => void;
    setShowModal: (v: boolean) => void;
    tasks: TaskType[];
};

const TaskList: React.FC<TaskListProps> = ({ tasks, setShowModal, setCurrentTask, deleteTask }) => {
    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    return (
        <>
            <Modal showModal={deleteModal} setShowModal={setDeleteModal} title="Delete task">
            <ConfirmDelete setShowModal={setDeleteModal} deleteUnit={deleteTask} />
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