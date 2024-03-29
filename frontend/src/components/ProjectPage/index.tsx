import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Alert from "components/Atoms/Alert";
import { useAuth } from "context/AuthProvider";
import { Project } from "types/Project"
import { getProject } from "utils/getProject";

import Contributors from "./components/Contributors";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Skeleton from "./Skeleton";

const ProjectPage: React.FC = () => {
    const params = useParams();
    const { auth } = useAuth();

    const [project, setProject] = useState<Project>();

    const [loading, setLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('');

    const { id } = params;

    const navigate = useNavigate();

    useEffect(() => {
        const loadProject = async () => {
            const data = await getProject(id);
            setLoading(false);
            if (!data) {
                navigate('/');
                return;
            }

            if (!data.project) {
                setMessage(data);
                return;
            };
            setProject(data.project);
        };
        loadProject();
    }, []);

    if (loading) return <Skeleton />;

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