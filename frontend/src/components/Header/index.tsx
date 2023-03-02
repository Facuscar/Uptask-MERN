import { Link } from "react-router-dom";
import { useProjects } from "context/ProjectProvider";

import Button from "components/Atoms/Button";
import { PATH } from "constants/path";

import Search from "./components/Search";


import * as S from './styles';

const Header: React.FC = () => {
    const { setSearching } = useProjects();

    const handleClick = () => {
        setSearching(true);
    }

    return (
        <S.MainWrapper>
            <S.Wrapper>
                <S.Heading>UpTask</S.Heading>

                <S.NavWrapper>
                    <Button text="Search project" type="button" onClick={handleClick} />
                    <Link to={PATH.PROJECTS} className="font-bold uppercase">Projects</Link>
                    <Button type="button" text="Log out" />
                    <Search />
                </S.NavWrapper>
            </S.Wrapper>
        </S.MainWrapper>
    );
}

export default Header;