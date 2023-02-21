import { ReactNode } from "react";

export const LinkWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <nav className="lg:flex lg:justify-between">{children}</nav>
);