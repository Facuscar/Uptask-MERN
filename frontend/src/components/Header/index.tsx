import { Link } from "react-router-dom";

import Button from "components/Atoms/Button";
import { PATH } from "constants/path";

import * as S from './styles';

const Header: React.FC = () => {
    return (
        <S.MainWrapper>
            <S.Wrapper>
                <S.Heading>UpTask</S.Heading>

                <S.NavWrapper>
                    <Button text="Search project" type="button" />
                    <Link to={PATH.PROJECTS} className="font-bold uppercase">Projects</Link>
                    <Button type="button" text="Log out" />
                </S.NavWrapper>
            </S.Wrapper>
        </S.MainWrapper>
    );
}

export default Header;