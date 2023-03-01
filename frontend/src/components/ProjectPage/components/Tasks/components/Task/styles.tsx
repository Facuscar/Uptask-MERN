import { ReactNode, HTMLAttributes } from 'react';

export const TaskWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="border-b p-5 flex justify-between items-center">{children}</div>
);

export const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div>{children}</div>
);

export const ButtonsWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="flex flex-col lg:flex-row gap-2">{children}</div>
);

export const EditButton: React.FC<{ children: string } & HTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
    <button className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg" {...props}>
        {children}
    </button>
);

export const DeleteButton: React.FC<{ children: string } & HTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
    <button className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg" {...props}>
        {children}
    </button>
);

export const CompleteButton: React.FC<{ children: string, state: boolean } & HTMLAttributes<HTMLButtonElement>> = ({ children, state, ...props }) => (
    <button className={`${state ? 'bg-lime-600': 'bg-slate-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`} {...props}>
        {children}
    </button>
);

export const NameText: React.FC<{ children: string, state: boolean }> = ({ children, state }) => (
    <p className={`mb-1 text-xl ${state && 'line-through'}`}>{children}</p>
);

export const DateText: React.FC<{ children: string }> = ({ children }) => (
    <p className="mb-1 text-xl">{children}</p>
);

export const DescriptionText: React.FC<{ children: string }> = ({ children }) => (
    <p className="mb-1 text-sm text-gray-500 uppercase">{children}</p>
);

export const PriorityText: React.FC<{ children: string }> = ({ children }) => (
    <p className="mb-1 text-gray-600">{children}</p>
);

export const CompletedByText: React.FC<{ children: string }> = ({ children }) => (
    <p className="text-white bg-lime-600 px-2 py-1 rounded inline">{children}</p>
);