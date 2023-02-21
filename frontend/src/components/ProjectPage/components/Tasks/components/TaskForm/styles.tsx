import { ReactNode, HTMLAttributes } from 'react';

export const Form: React.FC<{ children: ReactNode } & HTMLAttributes<HTMLFormElement>> = ({ children, ...props}) => (
    <form className="my-10" {...props}>
        {children}
    </form>
);

export const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="mb-5">{children}</div>
);