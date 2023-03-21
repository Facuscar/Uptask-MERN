import { ReactNode } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeaderWrapperSkeleton: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="flex justify-between items-center mb-5">{children}</div>
);

const TitleSkeleton: React.FC = () => (
    <Skeleton className="text-4xl w-72" />
);

const ActionsSkeleton: React.FC = () => (
    <Skeleton className="w-52" />
);

const NewTaskSkeleton: React.FC = () => (
    <Skeleton className="w-48 py-3 mb-5" />
);

const ProjectListWrapperSkeleton: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="bg-white shadow-md">{children}</div>
);


const ProjectCardSkeleton: React.FC = () => (
    <div className="flex justify-between items-center p-3 border-b mb-5">
        <div className="w-52">
            <Skeleton className="text-2xl mb-2" />
            <Skeleton className="mb-2"/>
            <Skeleton className="text-xl mb-2" />
            <Skeleton className="mb-2"/>
        </div>
        <div className="w-52 flex gap-2">
            <Skeleton className="text-4xl w-14" />
            <Skeleton className="text-4xl w-14" />
            <Skeleton className="text-4xl w-14" />
        </div>
    </div>
);

const ProjectPageSkeleton: React.FC = () => (
    <>
        <HeaderWrapperSkeleton>
            <TitleSkeleton />
            <ActionsSkeleton />
        </HeaderWrapperSkeleton>
        <NewTaskSkeleton />
        <ProjectListWrapperSkeleton>
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
        </ProjectListWrapperSkeleton>
    </>
);

export default ProjectPageSkeleton;