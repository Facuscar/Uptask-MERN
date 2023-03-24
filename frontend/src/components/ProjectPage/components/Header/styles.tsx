import { ReactNode } from "react"
import { Link, LinkProps } from "react-router-dom"

export const HeaderWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="flex justify-between">{children}</div>
}

export const IconsWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="flex justify-between gap-5">{children}</div>
}

export const IconWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="flex items-center gap-2 text-gray-400 hover:text-black">{children}</div>
}

export const EditProjectLink: React.FC<{ children: string } & LinkProps> = ({ children, ...props }) => (
    <Link className="uppercase font-bold" {...props}>{children}</Link>
);