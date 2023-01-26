import { useContext } from "react";

import ProjectsContext from "../context/ProjectProvider";

const useProjects = () => {
    return useContext(ProjectsContext);
}

export default useProjects;