import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CreateTaskButton from "./components/CreateTaskButton";
import Modal from "../Modal";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import { Task } from "../../../../types/Task";
import { getConfig } from "../../../../utils/getConfig";

import * as S from './styles';

type TasksProps = {
    projectId: string;
    projectTasks: Task[];
};

const Tasks: React.FC<TasksProps> = ({ projectId, projectTasks }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [tasks, setTasks] = useState<Task[]>(projectTasks)
    const [currentTask, setCurrentTask] = useState<Task>();

    const navigate = useNavigate();

    const getTitle = () => {
        const title = !currentTask ? 'Create task' : 'Edit task';
        return title;
    };

    const deleteTask = async () => {
        const token = localStorage.getItem('token');

        if(!token) {
            navigate('/'); 
            return;
        }

        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_API_TASKS_URL}/${currentTask?._id}`, getConfig(token))
            setTasks( prev => {
                return prev.filter( oldTask => oldTask._id !== currentTask?._id);
            });

        } catch (error: any) {
            console.log(error);
        }
    };

    const submitTask = (task: Task) => {
        const token = localStorage.getItem('token');
        
        if(!token) {
            navigate('/'); 
            return;
        }

        if (task._id) {
            editTask(task, token);
        } else {
            createTask(task, token);
        }
        
        setShowModal(false);
    };

    const createTask = async (task : Task, token: string) => {
        try {
            const { data } = await axios.post<Task>(import.meta.env.VITE_API_TASKS_URL, task, getConfig(token));

            setTasks( prev => {
                if (prev) {
                    return [...prev, data];
                } else {
                    return [data];
                }
            });

        } catch (error: any) {
            console.log(error); 
        }
    };

    const editTask = async (task: Task, token: string) => {
        try {
            const { data } = await axios.put<Task>(`${import.meta.env.VITE_API_TASKS_URL}/${task._id}`, task, getConfig(token));

            setTasks( prev => {
                return prev.map( oldTask => oldTask._id === task._id ? task : oldTask);
            })
        } catch (error: any) {
            console.log(error); 
        }
    };

    return (
        <>
            <CreateTaskButton setShowModal={setShowModal} setCurrentTask={setCurrentTask} />
            <Modal showModal={showModal} setShowModal={setShowModal} title={getTitle()}>
                <TaskForm projectId={projectId} submitTask={submitTask} task={currentTask}/>
            </Modal>
            <S.TasksWrapper>
                {tasks.length > 0
                    ? <TaskList tasks={tasks} setShowModal={setShowModal} setCurrentTask={setCurrentTask} deleteTask={deleteTask} /> 
                    : <p className="text-center my-5 p-10">You don't have any tasks yet!</p>}
            </S.TasksWrapper>
        </>
    );
};

export default Tasks;