import { ReactNode } from "react";

export const ListWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="bg-white shadow mt-10 rounded-lg">{children}</div>
);

export const AltText: React.FC<{ children: string }> = ({ children }) => (
    <p className="text-center text-gray-600 uppercase p-5">{children}</p>
);
