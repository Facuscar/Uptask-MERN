import { ReactNode, HTMLAttributes } from 'react';

export const LoginPageForm: React.FC<HTMLAttributes<HTMLFormElement> & { children: ReactNode }> = ({ children, ...props }) => {
    return (
        <form className="my-10 bg-white shadow rounded-lg p-10" {...props}>
            {children}
        </form>
    );
};