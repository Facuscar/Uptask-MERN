import ContributorForm from "./components/ContributorForm";

const NewContributorPage: React.FC = () => {
    return (
        <>
            <h1 className="text-4xl font-black">Add contributor</h1>

            <div className="mt-10 flex justify-center">
                <ContributorForm />
            </div>
        </>
    );
};

export default NewContributorPage;