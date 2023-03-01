import { ReactNode } from 'react';

export const MainWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <header className="px-4 py-5 bg-white border-b">{children}</header>
)

export const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="md:flex md:justify-between">{children}</div>
)

export const Heading: React.FC<{ children: string }> = ({ children }) => (
    <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">{children}</h2>
)

export const NavWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="flex items-center gap-4 flex-col md:flex-row">{children}</div>
)
