import { useState } from "react";

import Modal from "./Modal";
import ConfirmDelete from "./ConfirmDelete";
import Contributor from "./Contributor";

import { Contributor as ContributorType } from "../../../types/Contributor";

type ContributorListProps = {
    contributors: ContributorType[];
};

const ContributorList: React.FC<ContributorListProps> = ({ contributors }) => {
    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    return (
        <>
            <Modal>

            </Modal>
            {contributors.map(contributor => (
                <Contributor 
                    contributor={contributor}
                    key={contributor._id}
                    setDeleteModal={setDeleteModal}
                />
            ))}
        </>
    );
}

export default ContributorList;