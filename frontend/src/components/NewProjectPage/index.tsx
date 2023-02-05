import ProjectForm from "../ProjectForm";
import ProjectTitle from "../Atoms/ProjectTitle";

const NewProjectPage = () => {

    return (
        <>
            <ProjectTitle title="Create project" />

            <div className="mt-10 flex justify-center">
                <ProjectForm />
            </div>
        </>
    )
}

export default NewProjectPage;