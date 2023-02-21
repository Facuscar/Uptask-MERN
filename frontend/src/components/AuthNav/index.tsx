import AuthNavLink from "../Atoms/AuthNavLink";

import * as S from './styles';

type AuthNavProps = {
    leftTo: string;
    rightTo: string;
    leftText: string;
    rightText: string;
};

const AuthNav: React.FC<AuthNavProps> = ({ leftText, leftTo, rightText, rightTo }) => {
    return (
        <S.LinkWrapper>
            <AuthNavLink to={leftTo} text={leftText} />
            <AuthNavLink to={rightTo} text={rightText} />
        </S.LinkWrapper>
    );
};

export default AuthNav;