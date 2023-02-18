import Button from '../../../../Atoms/Button';

import { Contributor } from "../../../../../types/Contributor";

type ContributorCardProps = {
    contributor: Contributor;
    addContributor: () => void;
};

const ContributorCard: React.FC<ContributorCardProps> = ({ contributor, addContributor }) => {
    return (
        <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
                <h2 className="text-center mb-10 text-2xl font-bold">Result: </h2>
                <div className="flex justify-between items-center">
                    <p>{contributor.name}</p>

                    <Button text='Add to the project' type='button' onClick={addContributor} />
                </div>
            </div>
        </div>
    );
};

export default ContributorCard;