import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Header from "./components/Header";
import Tasks from "./components/Tasks";
import ContributorList from './components/ContributorList';

import { PATH } from "../../constants/path";
import { Project } from "../../types/Project"
import { getProject } from "../../utils/getProject";
import { Contributor } from '../../types/Contributor';

const ProjectPage: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState<Project>();
    const [contributors, setContributors] = useState<Contributor[]>();

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
            setContributors(data.contributors);
        } 
        loadProject();
    }, []);

    if (!project) return <>Project Page skeleton...</>;

    const { name, _id, tasks } = project;

    const deleteContributor = async () => {
        console.log(currentContributor);
    }

    //Refactor the option id field issue
    if (!_id) return <></>;

    return (
        // Make huge refactor of this file
        <>
            <Header name={name} projectId={_id} />

            <Tasks projectId={_id} projectTasks={tasks} />

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