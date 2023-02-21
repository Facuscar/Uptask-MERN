import { ReactNode } from "react"

export const TasksWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="bg-white shadow mt-10 rounded-lg">{children}</div>
);

export const AltText: React.FC<{ children: string }> = ({ children }) => (
    <p className="text-center my-5 p-10">{children}</p>
);