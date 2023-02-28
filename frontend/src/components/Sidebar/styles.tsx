import { ReactNode } from "react";
import { Link } from "react-router-dom";

export const Aside: React.FC<{ children: ReactNode }> = ({ children }) => (
    <aside className="md:w-80 lg-w96 px-5 py-10">{children}</aside>
)

export const UserName: React.FC<{ children: string }> = ({ children }) => (
    <p className="text-xl font-bold">{children}</p>
)

export const NewProjectNav: React.FC<{ children: string, to: string }> = ({ children, to }) => (
    <Link to={to} className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg">{children}</Link>
);