import { ReactNode } from "react";
import { Link } from "react-router-dom";

export const Aside: React.FC<{ children: ReactNode }> = ({ children }) => (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">{children}</aside>
)

export const UserName: React.FC<{ children: string }> = ({ children }) => (
    <p className="text-xl font-bold">{children}</p>
)

export const NewProjectNav: React.FC<{ children: string, to: string }> = ({ children, to }) => (
    <Link to={to} className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg">{children}</Link>
);