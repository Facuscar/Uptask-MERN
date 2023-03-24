import { ReactNode, HTMLAttributes } from 'react';

export const Form: React.FC<{ children: ReactNode } & HTMLAttributes<HTMLFormElement>> = ({ children, ...props }) => (
    <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg" {...props} >
        {children}
    </form>
);
