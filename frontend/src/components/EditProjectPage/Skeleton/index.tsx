import { ReactNode } from "react";

import Skeleton from "react-loading-skeleton";

const ButtonSkeleton: React.FC = () => (
    <Skeleton className="mb-5 text-4xl" />
);

const FormWrapperSkeleton: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="mt-10 p-5 bg-white">{children}</div>
);

const SkeletonWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="max-w-xl mx-auto">{children}</div>
}

const TitleSkeleton: React.FC = () => (
    <Skeleton className="text-4xl" />
);

const InputSkeleton: React.FC = () => (
    <>
        <Skeleton  className="text-4xl mb-1" />
        <Skeleton  className="mb-5 text-4xl" />
    </>
);

const EditProjectPageSkeleton: React.FC = () => (
    <SkeletonWrapper>  
        <TitleSkeleton />
        <FormWrapperSkeleton>
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
            <ButtonSkeleton />
        </FormWrapperSkeleton>
    </SkeletonWrapper>
);

export default EditProjectPageSkeleton;