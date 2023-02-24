import { ReactNode } from "react";
import { Link } from "react-router-dom";

export const HeaderWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="flex items-center justify-between mt-10">{children}</div>
);

export const HeaderTitle: React.FC<{ children: string }> = ({ children }) => (
    <p className="font-bold text-xl">{children}</p>
);

export const HeaderLink: React.FC<{ children: string, to: string }> = ({ children, to }) => (
    <Link className="text-gray-400 uppercase font-bold hover:text-black" to={to}>{children}</Link>
);

export const ContributorListWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="bg-white shadow mt-10 rounded-lg">{children}</div>
);

export const NoContributorsText: React.FC<{ children: string }> = ({ children }) => (
    <p className="text-center my-5 p-10">{children}</p>
);