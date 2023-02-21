import { ReactNode, HTMLAttributes } from 'react';

export const Button: React.FC<{ children: ReactNode } & HTMLAttributes<HTMLButtonElement>> = ({ children }) => (
    <button 
        type="button" 
        className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold text-white text-center bg-sky-400 mt-5 flex gap-2 items-center justify-center"
    >
        {children}
    </button>
)