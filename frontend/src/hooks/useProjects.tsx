import { useContext } from "react";

import ProjectsContext from "../context/ProjectContext";

const userProjects = () => {
    return useContext(ProjectsContext);
}

export default userProjects;