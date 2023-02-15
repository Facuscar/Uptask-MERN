import { ReactNode } from "react"

export const FormWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="p-5 flex justify-center">{children}</div>
}