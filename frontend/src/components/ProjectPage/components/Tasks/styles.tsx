import { ReactNode } from "react"

export const TasksWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="bg-white shadow mt-10 rounded-lg">{children}</div>
}