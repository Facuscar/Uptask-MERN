import { Task } from "./Task";
import { Contributor } from './Contributor';

export type Project = {
    name: string;
    description: string;
    dueDate: string;
    client: string;
    _id?: string;
    tasks: Task[];
    contributors: Contributor[];
};