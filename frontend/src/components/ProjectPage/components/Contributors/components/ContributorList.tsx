import { useState } from "react";

import Modal from "components/ProjectPage/components/Modal";
import ConfirmDelete from "components/ProjectPage/components/ConfirmDelete";

import Contributor from "./Contributor";

import { Contributor as ContributorType } from "types/Contributor";

type ContributorListProps = {
    contributors: ContributorType[];
    setCurrentContributor: (v: ContributorType) => void;
    deleteContributor: () => void;
};

const ContributorList: React.FC<ContributorListProps> = ({ contributors, setCurrentContributor, deleteContributor }) => {
    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const handleDelete = () => {
        deleteContributor();
        setDeleteModal(false);
    }

    return (
        <>
            <Modal title="Delete contributor" showModal={deleteModal} setShowModal={setDeleteModal}>
                <ConfirmDelete setShowModal={setDeleteModal} deleteUnit={handleDelete} />
            </Modal>
            {contributors.map(contributor => (
                <Contributor 
                    contributor={contributor}
                    key={contributor._id}
                    setDeleteModal={setDeleteModal}
                    setCurrentContributor={setCurrentContributor}
                />
            ))}
        </>
    );
}

export default ContributorList;