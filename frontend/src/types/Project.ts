import { Task } from "./Task";
import { Contributor } from './Contributor';

export type Project = {
    creator: string;
    name: string;
    description: string;
    dueDate: string;
    client: string;
    _id: string;
    tasks: Task[];
    contributors: Contributor[];
};

export type NewProject = {
    name: string;
    description: string;
    dueDate: string;
    client: string;
    _id?: string;
};