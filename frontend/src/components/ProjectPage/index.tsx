import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import CreateTaskButton from "./components/CreateTaskButton";
import ConfirmDelete from "./components/ConfirmDelete";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskModal from "./components/TaskModal";


import Alert from "../Atoms/Alert";
import DeleteIcon from "../Atoms/DeleteIcon";
import EditIcon from "../Atoms/EditIcon";
import ProjectTitle from "../Atoms/ProjectTitle";


import { PATH } from "../../constants/path";
import { Project } from "../../types/Project"
import { Task } from "../../types/Task";
import { getProject } from "../../utils/getProject";
import { getConfig } from "../../utils/getConfig";

const ProjectPage: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const [project, setProject] = useState<Project>();
    const [tasks, setTasks] = useState<Task[]>();

    const [currentTask, setCurrentTask] = useState<Task>();
    const { id } = params;

    useEffect(() => {
        const loadProject = async () => {
            const data = await getProject(id);
            if (!data) navigate('/');
            setProject(data);
            setTasks(data?.tasks);
        } 
        loadProject();
    }, []);

    if (!project) return <>Project skeleton...</>;

    const { name, _id } = project;

    const deleteProject = async () => {
        try {
            const token = localStorage.getItem('token');

            if(!token) {
                navigate('/');
                return;
            }

            const { data } = await axios.delete<{msg: string}>(`${import.meta.env.VITE_API_PROJECTS_URL}/${project._id}`, getConfig(token));

            navigate(PATH.PROJECTS);
        } catch (error: any) {
            setError(true);
            setMessage(error.response.data.msg);
        } finally {
            setShowAlert(true);
        }
    }

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
    }

    const editTask = async (task: Task, token: string) => {
        try {
            const { data } = await axios.put<Task>(`${import.meta.env.VITE_API_TASKS_URL}/${task._id}`, task, getConfig(token));

            setTasks( prev => {
                if (prev)
                return prev.map( oldTask => oldTask._id === task._id ? task : oldTask);
            })
        } catch (error: any) {
            console.log(error); 
        }
    }

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
    }

    if (!_id) return <></>;

    const getTitle = () => {
        const title = !currentTask && !showDeleteModal ? 'Create task' : currentTask && !showDeleteModal ? 'Edit task' : 'Delete task';
        return title;
    };

    return (
        <>
            {showAlert && <Alert message={message} error={error} />}
            <div className="flex justify-between">
                <ProjectTitle title={name} />
                <div className="flex justify-between gap-5">
                    <div className="flex items-center gap-2 text-gray-400 hover:text-black">
                        <EditIcon />
                        <Link to={`${PATH.EDIT_PROJECT}/${_id}`} className="uppercase font-bold">Edit</Link>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 hover:text-black">
                        <DeleteIcon />
                        <button className="uppercase font-bold" onClick={deleteProject}>Delete</button>
                    </div>
                </div>
            </div>
            <CreateTaskButton setShowModal={setShowModal} setCurrentTask={setCurrentTask} />
            <TaskModal showModal={showModal} setShowModal={setShowModal} title={getTitle()}>
                { showDeleteModal 
                    ? <ConfirmDelete />
                    : <TaskForm project={_id} submitTask={submitTask} task={currentTask}/> }
            </TaskModal>
            <div className="bg-white shadow mt-10 rounded-lg">
                {project._id && tasks 
                    ? <TaskList tasks={tasks} setShowModal={setShowModal} setCurrentTask={setCurrentTask} setShowDeleteModal={setShowDeleteModal}/> 
                    : <p>You don't have any tasks yet!</p>}
            </div>
        </>
    );
}

export default ProjectPage;