export type Priority = "Low" | "Medium" | "High";

export type CompletedBy = {
    _id: string;
    name: string;
}

export type Task = {
    _id: string;
    completedBy?: CompletedBy;
    description: string;
    dueDate: string;
    name: string;
    state: boolean;
    priority: Priority;
    project: string;
};