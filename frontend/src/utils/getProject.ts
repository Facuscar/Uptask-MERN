import axios from "axios";

import { Project } from "types/Project";

import { getConfig } from "./getConfig";

type GetProjectResponse = {
    project?: Project;
    msg: string;
}

export const getProject = async (id: string | undefined) => {

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        
        const { data } = await axios.get<GetProjectResponse>(`${import.meta.env.VITE_API_PROJECTS_URL}/${id}`, getConfig(token));
        return data;
    } catch (error: any) {
        return error.response.data.msg;
    }
}