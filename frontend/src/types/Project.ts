import { Task } from "./Task";

export type Project = {
    name: string;
    description: string;
    dueDate: string;
    client: string;
    _id?: string;
    tasks?: Task[];
};