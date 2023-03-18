import { Link, useNavigate } from "react-router-dom";

import Button from "components/Atoms/Button";
import { PATH } from "constants/path";
import { useAuth } from "context/AuthProvider";
import { useProjects } from "context/ProjectProvider";

import Search from "./components/Search";


import * as S from './styles';

const Header: React.FC = () => {
    const navigate = useNavigate();

    const { logOut } = useAuth();
    const { clearState } = useProjects();

    const handleClick = () => {
        logOut();
        clearState();
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <S.MainWrapper>
            <S.Wrapper>
                <S.Heading>UpTask</S.Heading>

                <S.NavWrapper>
                    <Search />
                    <Link to={PATH.PROJECTS} className="font-bold uppercase">Projects</Link>
                    <Button type="button" text="Log out" onClick={handleClick} />
                </S.NavWrapper>
            </S.Wrapper>
        </S.MainWrapper>
    );
}

export default Header;