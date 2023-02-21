import ProjectForm from "components/ProjectForm";
import ProjectTitle from "components/Atoms/ProjectTitle";

import * as S from './styles';

const NewProjectPage = () => {

    return (
        <>
            <ProjectTitle title="Create project" />

            <S.FormWrapper>
                <ProjectForm />
            </S.FormWrapper>
        </>
    )
}

export default NewProjectPage;