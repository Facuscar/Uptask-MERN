import Alert from "components/Atoms/Alert";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useAuth from "hooks/useAuth";
import { Project } from "types/Project"
import { getProject } from "utils/getProject";

import Contributors from "./components/Contributors";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

const ProjectPage: React.FC = () => {
    const params = useParams();
    const userId = useAuth()?.auth?._id;

    const [project, setProject] = useState<Project>();

    const [loading, setLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('');

    const { id } = params;

    useEffect(() => {
        const loadProject = async () => {
            const data = await getProject(id);
            if (!data.project) {
                setMessage(data);
                return;
            };

            setLoading(false);
            setProject(data.project);
        };
        loadProject();
    }, []);

    if (loading) return <>Project Page skeleton...</>;

    if (!project) return <Alert message={message} error />;

    const { name, _id, tasks, contributors, creator } = project;

    const isCreator = creator === userId;

    return (
        <>
            <Header name={name} projectId={_id} isCreator={isCreator} />

            <Tasks projectId={_id} projectTasks={tasks} isCreator={isCreator} />

            {isCreator && <Contributors projectId={_id} projectContributors={contributors} />}
        </>    
    );
}

export default ProjectPage;