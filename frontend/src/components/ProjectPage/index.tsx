import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Alert from "components/Atoms/Alert";
import { useAuth } from "context/AuthProvider";
import { Project } from "types/Project"
import { getProject } from "utils/getProject";

import Contributors from "./components/Contributors";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

const ProjectPage: React.FC = () => {
    const params = useParams();
    const { auth } = useAuth();

    const [project, setProject] = useState<Project>();

    const [loading, setLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('');

    const { id } = params;

    let socket;

    useEffect(() => {
        const loadProject = async () => {
            const data = await getProject(id);
            setLoading(false);
            if (!data.project) {
                setMessage(data);
                return;
            };
            setProject(data.project);
        };
        loadProject();
    }, []);

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL);
        socket.emit('open project', id)
    }, []);

    if (loading) return <>Project Page skeleton...</>;

    if (!project) return <Alert message={message} error />;

    const { name, _id, tasks, contributors, creator } = project;

    const isCreator = creator === auth?._id;

    return (
        <>
            <Header name={name} projectId={_id} isCreator={isCreator} />

            <Tasks projectId={_id} projectTasks={tasks} isCreator={isCreator} />

            {isCreator && <Contributors projectId={_id} projectContributors={contributors} />}
        </>    
    );
}

export default ProjectPage;