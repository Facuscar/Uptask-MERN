import axios from "axios";
import { useEffect, useState, useMemo, useContext, createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { NewProject, Project } from "types/Project";
import { getConfig } from "utils/getConfig";

type Context = {
    submitProject: (project: NewProject) => Promise<{ message: string, success: boolean } | undefined>;
    editProject: (project: NewProject) => Promise<{ message: string, success: boolean } | undefined>;
    projects: Project[] | undefined;
    setProjects: (projects: Project[]) => void;
    filteredProjects: Project[] | undefined;
    setFilteredProjects: (projects: Project[]) => void;
};

const ProjectsContext = createContext<Context | null>(null);

export const ProjectsProvider = ({ children } : { children: ReactNode }) => {

    const navigate = useNavigate();

    const [projects, setProjects] = useState<Project[]>();
    const [filteredProjects, setFilteredProjects] = useState<Project[]>();

    const submitProject = async (project: NewProject) => {
        
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

    const editProject = async (project: NewProject) => {

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

    useEffect(() => {
        setFilteredProjects(projects);
    }, [projects]);

    const memoizedValues = useMemo(() => {
        return {
            submitProject,
            editProject,
            projects,
            setProjects,
            filteredProjects,
            setFilteredProjects
        };
    }, [submitProject, editProject])

    return (
        <ProjectsContext.Provider value={memoizedValues}>
           {children} 
        </ProjectsContext.Provider>
    )
}

export default ProjectsContext;

export const useProjects = () => {
    const context = useContext(ProjectsContext);
    if (!context) {
      throw new Error('[ProjectsContext] Missing context');
    }
    return context;
};