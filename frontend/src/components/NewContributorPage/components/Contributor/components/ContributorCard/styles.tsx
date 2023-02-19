import { ReactNode } from 'react';

export const MainWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="flex justify-center mt-10">{children}</div>
)


export const Cardwrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
        {children}
    </div>
);

export const CardTitle: React.FC<{ children: string }> = ({ children }) => (
    <h2 className="text-center mb-10 text-2xl font-bold">{children}</h2>
)

export const NameWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="flex justify-between items-center">
        {children}
    </div>
);