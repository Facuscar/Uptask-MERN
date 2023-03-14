import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

import Modal from "components/ProjectPage/components/Modal";
import { Task, NewTask } from "types/Task";
import { getConfig } from "utils/getConfig";


import CreateTaskButton from "./components/CreateTaskButton";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";


import * as S from './styles';

type CompleteTaskResponse = {
    task?: Task;
    msg: string;
};

type TasksProps = {
    isCreator: boolean;
    projectId: string;
    projectTasks: Task[];
};

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const Tasks: React.FC<TasksProps> = ({ isCreator, projectId, projectTasks }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [tasks, setTasks] = useState<Task[]>(projectTasks);
    const [currentTask, setCurrentTask] = useState<Task>();
    const navigate = useNavigate();

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL);
        socket.emit('open project', projectId);
    }, []);

    useEffect(() => {
        socket.on('task created', (newTask: Task) => {
            if (newTask.project !== projectId) return;
            setTasks( prev => {
                if (prev.some(task => task._id === newTask._id)) {
                    return prev;
                }
                return [...prev, newTask];
            });
        });

        socket.on('task deleted', (deletedTask: Task) => {
            if (deletedTask.project !== projectId) return;
            setTasks( prev => {
                return prev.filter( oldTask => oldTask._id !== deletedTask._id);
            });
        })
    });

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

            socket.emit('delete task', currentTask);
        } catch (error: any) {
            console.log(error);
        }
    };

    const submitTask = (task: NewTask) => {
        const token = localStorage.getItem('token');
        
        if(!token) {
            navigate('/'); 
            return;
        }

        if (!task._id) {
            createTask(task, token);
        } else {
            editTask(task as Task, token);
        }
        
        setShowModal(false);
    };

    const createTask = async (task: NewTask, token: string) => {
        try {
            const { data } = await axios.post<Task>(import.meta.env.VITE_API_TASKS_URL, task, getConfig(token));

            setTasks( prev => {
                if (prev) {
                    return [...prev, data];
                } else {
                    return [data];
                }
            });

            socket.emit('new task', data);
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

    const completeTask = async (taskId: string) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }

            const { data } = await axios.post<CompleteTaskResponse>(`${import.meta.env.VITE_API_TASKS_URL}/state/${taskId}`, {}, getConfig(token));

            const { task } = data;

            if (task) {
                setTasks( (prevTasks) => {
                    return prevTasks.map( prevTask => (prevTask._id === task._id) ? task : prevTask)
                });
            }
            
        } catch (error: any) {
            console.log(error.response.data);
        }
    }

    return (
        <>
            { isCreator && <CreateTaskButton setShowModal={setShowModal} setCurrentTask={setCurrentTask} />}
            <Modal showModal={showModal} setShowModal={setShowModal} title={getTitle()}>
                <TaskForm projectId={projectId} submitTask={submitTask} task={currentTask}/>
            </Modal>
            <S.TasksWrapper>
                {tasks.length > 0
                    ? <TaskList 
                        tasks={tasks} 
                        setShowModal={setShowModal} 
                        setCurrentTask={setCurrentTask} 
                        deleteTask={deleteTask} 
                        completeTask={completeTask}
                        isCreator={isCreator}
                    /> 
                    : <S.AltText>You don't have any tasks yet!</S.AltText>}
            </S.TasksWrapper>
        </>
    );
};

export default Tasks;