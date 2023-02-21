import Button from 'components/Atoms/Button';
import { Contributor } from "types/Contributor";

import * as S from './styles';

type ContributorCardProps = {
    contributor: Contributor;
    addContributor: () => void;
};

const ContributorCard: React.FC<ContributorCardProps> = ({ contributor, addContributor }) => {
    return (
        <S.MainWrapper>
            <S.Cardwrapper>
                <S.CardTitle>Result: </S.CardTitle>
                <S.NameWrapper>
                    <p>{contributor.name}</p>

                    <Button text='Add to the project' type='button' onClick={addContributor} />
                </S.NameWrapper>
            </S.Cardwrapper>
        </S.MainWrapper>
    );
};

export default ContributorCard;