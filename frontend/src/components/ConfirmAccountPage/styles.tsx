import { ReactNode } from "react"
import { Link, LinkProps } from "react-router-dom"

export const BottomWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="mt-20 md:mt-5 shadow:lg px-5 py-10 rounded-xl bg-white">{children}</div>
}

export const LogInLink: React.FC<{ children: string } & LinkProps> = ({ children, ...props }) => (
    <Link className="block text-center my-5 text-slate-500 uppercase text-sm" {...props}>{children}</Link>
)