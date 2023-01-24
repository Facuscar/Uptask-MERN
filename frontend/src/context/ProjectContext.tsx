import axios from "axios";
import { useState, useEffect, createContext, ReactNode } from "react";

const ProjectsContext = createContext<string>('');

export const ProjectsProvider = ({ children } : { children: ReactNode }) => {

    const [projects, setProjects] = useState();

    return (
        <ProjectsContext.Provider value={{

        }}>
           {children} 
        </ProjectsContext.Provider>
    )
}

export default ProjectsContext;