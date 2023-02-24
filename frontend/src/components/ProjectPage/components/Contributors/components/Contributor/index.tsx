import { Contributor as ContributorType } from "types/Contributor";

import * as S from './styles';

type ContributorProps = {
    contributor: ContributorType;
    setCurrentContributor: (v: ContributorType) => void;
    setDeleteModal: (v: boolean) => void;
}

const Contributor: React.FC<ContributorProps> = ({ contributor, setDeleteModal, setCurrentContributor }) => {
    const { name, email }  = contributor;

    const handleClick = () => {
        setDeleteModal(true);
        setCurrentContributor(contributor);
    }

    return (
        <S.ContributorWrapper>
            <S.Wrapper>
                <S.Name>{name}</S.Name>
                <S.Email>{email}</S.Email>
            </S.Wrapper>
            {/* Refactor this button with component with variants */}
            <S.DeleteButton onClick={handleClick}>Delete</S.DeleteButton>

        </S.ContributorWrapper>
    );
};

export default Contributor;