import { Task as TaskType } from "../types/Task";
import Task from "./Task";

type TaskProps = {
    tasks: TaskType[];
    id: string;
    createTask: (task: TaskType) => void;
};

const TaskList: React.FC<TaskProps> = ({ tasks, id, createTask }) => {
    return (
        <>
            {tasks.map(task => (
                <Task task={task} key={task._id} projectId={id} createTask={createTask} />
            ))}
        </>
    );
}

export default TaskList;