import { ReactNode } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export const ListWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="bg-white shadow mt-10 rounded-lg">{children}</div>
);

export const AltText: React.FC<{ children: string }> = ({ children }) => (
    <p className="text-center text-gray-600 uppercase p-5">{children}</p>
);

export const ProjectSkeletonWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="border-b p-5">{children}</div>
);

export const TextSkeleton: React.FC = () => (
    <Skeleton count={2} className="mb-2" />
);