import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Header from "./components/Header";
import CreateTaskButton from "./components/CreateTaskButton";
import ContributorList from './components/ContributorList';
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Modal from "./components/Modal";

import { PATH } from "../../constants/path";
import { Project } from "../../types/Project"
import { Task } from "../../types/Task";
import { getProject } from "../../utils/getProject";
import { getConfig } from "../../utils/getConfig";
import { Contributor } from '../../types/Contributor';

const ProjectPage: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState<boolean>(false);

    const [project, setProject] = useState<Project>();
    const [tasks, setTasks] = useState<Task[]>();
    const [contributors, setContributors] = useState<Contributor[]>();

    const [currentTask, setCurrentTask] = useState<Task>();
    const [currentContributor, setCurrentContributor] = useState<Contributor>();

    const { id } = params;

    useEffect(() => {
        const loadProject = async () => {
            const data = await getProject(id);
            if (!data) {
                navigate('/');
                return;
            };
            setProject(data);
            setTasks(data.tasks);
            setContributors(data.contributors);
        } 
        loadProject();
    }, []);

    if (!project) return <>Project skeleton...</>;

    const { name, _id } = project;

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
                if (prev)
                return prev.map( oldTask => oldTask._id === task._id ? task : oldTask);
            })
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

    const deleteTask = async () => {
        const token = localStorage.getItem('token');

        if(!token) {
            navigate('/'); 
            return;
        }

        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_API_TASKS_URL}/${currentTask?._id}`, getConfig(token))
            setTasks( prev => {
                if (prev)
                return prev.filter( oldTask => oldTask._id !== currentTask?._id);
            });

        } catch (error: any) {
            console.log(error);
        }
    };

    const deleteContributor = async () => {
        console.log(currentContributor);
    }

    if (!_id) return <></>;

    const getTitle = () => {
        const title = !currentTask ? 'Create task' : 'Edit task';
        return title;
    };

    return (
        // Make huge refactor of this file
        <>
            <Header name={name} _id={_id} />
            <CreateTaskButton setShowModal={setShowModal} setCurrentTask={setCurrentTask} />
            <Modal showModal={showModal} setShowModal={setShowModal} title={getTitle()}>
                <TaskForm project={_id} submitTask={submitTask} task={currentTask}/>
            </Modal>
            <div className="bg-white shadow mt-10 rounded-lg">
                {tasks && tasks.length > 0
                    ? <TaskList tasks={tasks} setShowModal={setShowModal} setCurrentTask={setCurrentTask} deleteTask={deleteTask} /> 
                    : <p className="text-center my-5 p-10">You don't have any tasks yet!</p>}
            </div>
            <div className="flex items-center justify-between mt-10">
                <p className="font-bold text-xl">Contributors</p>
                <Link 
                    to={`${PATH.NEW_CONTRIBUTOR}/${_id}`} 
                    className="text-gray-400 uppercase font-bold hover:text-black"
                >
                    Add contributor
                </Link>
            </div>

            <div className="bg-white shadow mt-10 rounded-lg">
                {contributors && contributors.length > 0
                    ? <ContributorList contributors={contributors} setCurrentContributor={setCurrentContributor} deleteContributor={deleteContributor} />
                    : <p className="text-center my-5 p-10">This project doesn't have any contributors</p>
                }
            </div>
        </>
    );
}

export default ProjectPage;