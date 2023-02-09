import axios from "axios";
import { createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { Project } from "../types/Project";

import { getConfig } from "../utils/getConfig";

type Context = {
    submitProject: (project: Project) => Promise<{ message: string, success: boolean } | undefined>;
    editProject: (project: Project) => Promise<{ message: string, success: boolean } | undefined>;
};

const ProjectsContext = createContext<Context | null>(null);

export const ProjectsProvider = ({ children } : { children: ReactNode }) => {

    const navigate = useNavigate();

    const submitProject = async (project: Project) => {
        
        let success = false;
        let message = '';

        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                navigate('/');
                return;
            }

            const { data } = await axios.post<{msg: string}>(import.meta.env.VITE_API_PROJECTS_URL, project, getConfig(token));
            success = true;
            message = data.msg;
        } catch (error: any) {
            console.log(error);
            message = error.response.data.msg;
        } 
        return { 
            success,
            message,
        }
    }

    const editProject = async (project:Project) => {

        let success = false;
        let message = ''

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/');
                return;
            }

            const { data } = await axios.put<{msg: string}>(`${import.meta.env.VITE_API_PROJECTS_URL}/${project._id}`, project, getConfig(token));
            success = true;
            message = data.msg; 

        } catch (error: any) {
            console.log(error.response.data);
            message = error.response.data.msg
        }

        return { 
            success,
            message,
        }
    }

    return (
        <ProjectsContext.Provider value={{
            submitProject,
            editProject,
        }}>
           {children} 
        </ProjectsContext.Provider>
    )
}

export default ProjectsContext;