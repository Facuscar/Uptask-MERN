import axios from "axios";

import { Project } from "../types/Project";

export const getProject = async (id: string | undefined) => {

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        };
        
        const { data } = await axios.get<Project>(`${import.meta.env.VITE_API_PROJECTS_URL}/${id}`, config);
        return data;
    } catch (error) {
        console.log(error);
    }
}