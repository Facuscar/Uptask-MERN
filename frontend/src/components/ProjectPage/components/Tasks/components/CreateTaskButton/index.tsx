import PlusIcon from "components/Atoms/PlusIcon";

import { Task } from "types/Task";

import * as S from './styles';

type CreateTaskButtonProps = {
    setCurrentTask: (task: Task | undefined) => void;
    setShowModal: (v: boolean) => void;
};

const CreateTaskButton: React.FC<CreateTaskButtonProps> = ({ setShowModal, setCurrentTask }) => {
    const handleClick = () => {
        setShowModal(true);
        setCurrentTask(undefined);
    }

    return (
        <S.Button onClick={handleClick}>
            <PlusIcon />
            New task
        </S.Button>
    );
}

export default CreateTaskButton;