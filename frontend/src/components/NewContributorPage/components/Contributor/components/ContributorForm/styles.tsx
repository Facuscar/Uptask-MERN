import { ReactNode, HTMLAttributes } from 'react';

export const SearchForm: React.FC<HTMLAttributes<HTMLFormElement> & { children: ReactNode }> = ({ children }) => (
    <form className="flex justify-between items-center">
        {children}
    </form>
);