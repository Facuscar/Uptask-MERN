import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import CreateTask from "./CreateTask";

import Alert from "../Atoms/Alert";
import DeleteIcon from "../Atoms/DeleteIcon";
import EditIcon from "../Atoms/EditIcon";
import ProjectTitle from "../Atoms/ProjectTitle";
import TaskList from "../TaskList";

import { PATH } from "../../constants/path";
import { Project } from "../../types/Project"
import { Task } from "../../types/Task";
import { getProject } from "../../utils/getProject";

const ProjectPage: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const [showModal, setShowModal] = useState<boolean>(false);

    const [project, setProject] = useState<Project>();
    const [tasks, setTasks] = useState<Task[]>();

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
            if(!token) navigate('/');

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axios.delete<{msg: string}>(`${import.meta.env.VITE_API_PROJECTS_URL}/${project._id}`, config);

            navigate(PATH.PROJECTS);
        } catch (error: any) {
            setError(true);
            setMessage(error.response.data.msg);
        } finally {
            setShowAlert(true);
        }
    }

    const createTask = async (task : Task) => {
        try {
            const token = localStorage.getItem('token');
            if(!token) navigate('/');

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axios.post<Task>(import.meta.env.VITE_API_TASKS_URL, task, config)

            setTasks( prev => {
                if (prev) {
                    return [...prev, data];
                } else {
                    return [data];
                }
            });

            setShowModal(false);
            setShowAlert(false);

        } catch (error: any) {
            console.log(error); 
        }
    }

    if (!_id) return <></>;

    return (
        <>
            {showAlert && <Alert message={message} error={error} />}
            <div className="flex justify-between">
                <ProjectTitle title={name} />
                <div className="flex justify-between gap-5">
                    {/* TODO: Refactor icons into components */}
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
            <CreateTask showModal={showModal} setShowModal={setShowModal} projectId={_id} createTask={createTask} />
            <div className="bg-white shadow mt-10 rounded-lg">
                {project._id && tasks ? <TaskList createTask={createTask} tasks={tasks} id={project._id} /> : <p>You don't have any tasks yet!</p>}
            </div>
        </>
    );
}

export default ProjectPage;