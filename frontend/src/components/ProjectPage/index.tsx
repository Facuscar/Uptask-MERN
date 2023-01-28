import { Project } from "../../types/Project"

type RestaurantPageProps = {
    project: Project;
};

const RestaurantPage: React.FC<RestaurantPageProps> = ({ project }) => {
    const { name } = project;
    return (
        <div>
            <h1 className="font-black text-4xl">{name}</h1>
        </div>
    );
}

export default RestaurantPage;