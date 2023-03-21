import { ReactNode } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export const SkeletonWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className='max-w-xl mx-auto'>{children}</div>
);

export const TitleSkeleton : React.FC = () => (
    <Skeleton className='text-4xl' />
);

export const FormWrapperSkeleton: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className='py-10 px-2 bg-white mt-10'>{children}</div>
);

export const FormSkeleton: React.FC = () => (
    <Skeleton count={3} className='mb-3 text-4xl' />
);

const NewContributorPageSkeleton: React.FC = () => (
    <SkeletonWrapper>
        <TitleSkeleton />
        <FormWrapperSkeleton>
            <FormSkeleton />
        </FormWrapperSkeleton>
    </SkeletonWrapper>
);

export default NewContributorPageSkeleton;