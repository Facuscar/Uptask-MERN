import { useState } from "react";
import { Link } from "react-router-dom";

import { Contributor } from "../../../../types/Contributor";
import { PATH } from "../../../../constants/path";

import ContributorList from "./components/ContributorList";

type ContributorsProps = {
    projectId: string;
    projectContributors: Contributor[];
}

const Contributors: React.FC<ContributorsProps> = ({ projectId, projectContributors }) => {
    const [contributors, setContributors] = useState<Contributor[]>(projectContributors);
    const [currentContributor, setCurrentContributor] = useState<Contributor>();

    const deleteContributor = async () => {
        console.log(currentContributor);
    }

    return (
        <>
            <div className="flex items-center justify-between mt-10">
                <p className="font-bold text-xl">Contributors</p>
                <Link 
                    to={`${PATH.NEW_CONTRIBUTOR}/${projectId}`} 
                    className="text-gray-400 uppercase font-bold hover:text-black"
                >
                    Add contributor
                </Link>
            </div>
            <div className="bg-white shadow mt-10 rounded-lg">
                {contributors.length > 0
                    ? <ContributorList contributors={contributors} setCurrentContributor={setCurrentContributor} deleteContributor={deleteContributor} />
                    : <p className="text-center my-5 p-10">This project doesn't have any contributors</p>
                }
            </div>
        </>
    );
}

export default Contributors;