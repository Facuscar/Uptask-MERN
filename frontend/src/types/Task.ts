export type Priority = "Low" | "Medium" | "High";

export type Task = {
    name: string;
    description: string;
    state: boolean;
    dueDate: string;
    priority: Priority;
    _id: string;
    project: string;
};