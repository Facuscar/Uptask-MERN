import { Contributor as ContributorType } from "../../../types/Contributor";

import Contributor from "./Contributor";

type ContributorListProps = {
    contributors: ContributorType[];
};

const ContributorList: React.FC<ContributorListProps> = ({ contributors }) => {
    return (
        <>
            {contributors.map(contributor => (
                <Contributor 
                    contributor={contributor}
                    key={contributor._id}
                />
            ))}
        </>
    );
}

export default ContributorList;