import { Task as TaskType } from "../types/Task";
import Task from "./Task";

type TaskProps = {
    tasks: TaskType[];
};

const TaskList: React.FC<TaskProps> = ({ tasks }) => {
    console.log(tasks)
    return (
        <>
            {tasks.map(task => (
                <Task task={task} key={task._id} />
            ))}
        </>
    );
}

export default TaskList;