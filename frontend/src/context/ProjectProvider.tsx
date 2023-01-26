import axios from "axios";
import { useState, useEffect, createContext, ReactNode } from "react";

type Project = {
    name: string;
    description: string;
    dueDate: string;
    client: string;
};

type Context = {
    submitProject: (project: Project) => Promise< { message: string, success: boolean } | undefined>;
};

const ProjectsContext = createContext<Context | null>(null);

export const ProjectsProvider = ({ children } : { children: ReactNode }) => {

    const submitProject = async (project: Project) => {
        
        let success = false;
        let message = '';

        try {
            const token = localStorage.getItem('token');
            
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }

            const { data } = await axios.post<{msg: string}>(import.meta.env.VITE_API_PROJECTS_URL, project, config)
            success = true;
            message = data.msg;
        } catch (error: any) {
            console.log(error);
            message = 'There was an error... please try again later';
        } 
        return { 
            success,
            message,
        }
    }

    return (
        <ProjectsContext.Provider value={{
            submitProject
        }}>
           {children} 
        </ProjectsContext.Provider>
    )
}

export default ProjectsContext;