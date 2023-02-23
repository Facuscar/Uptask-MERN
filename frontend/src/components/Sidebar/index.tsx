import { PATH } from "constants/path";
import useAuth from "hooks/useAuth";

import * as S from './styles';

const Sidebar: React.FC = () => {

    const userContext = useAuth();
    let auth = null;

    if (userContext) ({ auth } = userContext);

    return (
        <S.Aside>
            <S.UserName>{`Hello! ${auth?.name}`}</S.UserName> 

            <S.NewProjectNav to={PATH.CREATE_PROJECT}>New project</S.NewProjectNav>
        </S.Aside>
    );
}

export default Sidebar;