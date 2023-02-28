import { ReactNode } from "react";
import { Link } from "react-router-dom";

export const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="border-b p-5">{children}</div>
);

export const ProjectName: React.FC<{ 
    projectName: string, 
    clientName: string, 
    isCreator: boolean 
}> = ({ projectName, clientName, isCreator }) => (
    <div className="flex">
        <p className="flex-1">{projectName}<span className="text-sm text-gray-500 uppercase"> - {clientName}</span></p>
        { !isCreator && <p className="p-2 text-xs rounded-lg text-white bg-green-500 font-bold uppercase">Contributor</p> }
    </div>
    
);

export const ProjectLink: React.FC<{ to: string, children: ReactNode }> = ({ children, to }) => (
    <Link to={to} className="text-gray-600 hover:to-gray-800 uppercase text-sm font-bold">{children}</Link>
)