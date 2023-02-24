import { ReactNode, HTMLAttributes } from 'react';

export const ContributorWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="border-b p-5 flex justify-between items-center">{children}</div>
);

export const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div>{children}</div>
);

export const DeleteButton: React.FC<{ children: string } & HTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
    <button 
        type="button" 
        className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
        {...props}
    >
        {children}
    </button>
);

export const Name: React.FC<{ children: string }> = ({ children }) => (
    <p>{children}</p>
);

export const Email: React.FC<{ children: string }> = ({ children }) => (
    <p className="text-sm text-gray-700">{children}</p>
);