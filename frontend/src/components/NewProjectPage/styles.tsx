import { ReactNode } from "react";

export const FormWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="mt-10 flex justify-center">{children}</div>
    );
};