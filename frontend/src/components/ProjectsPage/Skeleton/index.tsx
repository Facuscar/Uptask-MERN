import { ReactNode } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const ProjectSkeletonWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="border-b p-5">{children}</div>
);

const TextSkeleton: React.FC = () => (
    <Skeleton count={2} className="mb-2" />
);

export const SkeletonWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="bg-white shadow mt-10 rounded-lg">{children}</div>
);

const ProjectsPageSkeleton: React.FC = () => (
    <SkeletonWrapper>
        <ProjectSkeletonWrapper>
            <TextSkeleton />
        </ProjectSkeletonWrapper>
        <ProjectSkeletonWrapper>
            <TextSkeleton />
        </ProjectSkeletonWrapper>
        <ProjectSkeletonWrapper>
            <TextSkeleton />
        </ProjectSkeletonWrapper>
    </SkeletonWrapper>
);

export default ProjectsPageSkeleton;