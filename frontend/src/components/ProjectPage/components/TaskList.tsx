import { Task as TaskType } from "../../../types/Task";

import Task from "./Task";

type TaskListProps = {
    setCurrentTask: (task: TaskType) => void;
    setShowModal: (v: boolean) => void;
    tasks: TaskType[];
};

const TaskList: React.FC<TaskListProps> = ({ tasks, setShowModal, setCurrentTask }) => {
    return (
        <>
            {tasks.map(task => (
                <Task task={task} key={task._id} setShowModal={setShowModal} setCurrentTask={setCurrentTask} />
            ))}
        </>
    );
}

export default TaskList;