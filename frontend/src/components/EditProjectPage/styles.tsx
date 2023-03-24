import { ReactNode } from "react"

export const FormWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="p-5 flex justify-center">{children}</div>
}

export const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="max-w-xl mx-auto">{children}</div>
}