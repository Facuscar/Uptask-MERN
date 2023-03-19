import { ReactNode } from "react"
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


export const FormWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="p-5 flex justify-center">{children}</div>
}

export const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="max-w-xl mx-auto">{children}</div>
}

export const TitleSkeleton: React.FC = () => (
    <Skeleton className="text-4xl" />
);

export const InputSkeleton: React.FC = () => (
    <>
        <Skeleton  className="text-4xl mb-1" />
        <Skeleton  className="mb-5 text-4xl" />
    </>
);

export const FormWrapperSkeleton: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="mt-10 p-5 bg-white">{children}</div>
};

export const ButtonSkeleton = () => (
    <Skeleton  className="mb-5 text-4xl" />
);