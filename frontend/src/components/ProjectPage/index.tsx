import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ProjectTitle from "../Atoms/ProjectTitle";
import Alert from "../Atoms/Alert";
import { PATH } from "../../constants/path";
import { Project } from "../../types/Project"

type ProjectPageProps = {
    project: Project;
};

const ProjectPage: React.FC<ProjectPageProps> = ({ project }) => {
    const { name, _id } = project;
    const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

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

    return (
        <>
            {showAlert && <Alert message={message} error={error} />}
            <div className="flex justify-between">
                <div>
                    <ProjectTitle title={name} />
                </div>
                <div className="flex justify-between gap-5">
                    <div className="flex items-center gap-2 text-gray-400 hover:text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                        <Link to={`${PATH.EDIT_PROJECT}/${_id}`} className="uppercase font-bold">Edit</Link>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 hover:text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        <button className="uppercase font-bold" onClick={deleteProject}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectPage;