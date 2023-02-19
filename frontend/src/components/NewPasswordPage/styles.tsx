import { ReactNode, HTMLAttributes } from 'react';

export const NewPasswordForm: React.FC<HTMLAttributes<HTMLFormElement> & { children: ReactNode }> = ({ children }) => (
    <form  className="my-10 bg-white shadow rounded-lg p-10">
        {children}
    </form>
);