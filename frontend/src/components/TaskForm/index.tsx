import Input from "../Atoms/Form/Input";
import Select from "../Atoms/Form/Select";
import SubmitButton from "../Atoms/Form/SubmitButton";

const TaskForm: React.FC = () => {

    const OPTIONS = ["Low", "Medium", "High"];

    return (
        <form className="my-10">
            <div className="mb-5">
                <Input name="Task name" id="name" type="text" placeholder="Validate UX design in figma" />
                <Input name="Task description" id="description" type="text" placeholder="Make sure the buttons and inputs are properly aligned" />
                <Select name="Task priority" id="priority" options={OPTIONS} />

                <SubmitButton value="Create task" />
            </div>
        </form>
    );
    
}

export default TaskForm;