import { ReactNode, HTMLAttributes } from 'react';

export const SearchForm: React.FC<HTMLAttributes<HTMLFormElement> & { children: ReactNode }> = ({ children, ...props }) => (
    <form className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow" {...props}>
        {children}
    </form>
);