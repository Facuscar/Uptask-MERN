import ProjectForm from "../ProjectForm";
import ProjectTitle from "../Atoms/ProjectTitle";

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