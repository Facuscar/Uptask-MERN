import { Task as TaskType } from "types/Task";
import { formatDate } from "utils/formatDate";

import * as S from './styles';

type TaskProps = {
    isCreator: boolean;
    completeTask: (taskId: string) => void;
    setCurrentTask: (task: TaskType) => void;
    setDeleteModal: (v: boolean) => void;
    setShowModal: (v: boolean) => void;
    task: TaskType;
};

const Task: React.FC<TaskProps> = ({ task, setShowModal, setCurrentTask, setDeleteModal, isCreator, completeTask }) => {

    const { description, name, dueDate, priority, state, _id, completedBy } = task

    const handleClick = () => {
        setShowModal(true);
        setCurrentTask(task);
    };

    const handleDeleteClick = () => {
        setDeleteModal(true);
        setCurrentTask(task);
    }

    const handleCompleteClick = async () => {
        completeTask(_id);
    }

    return (
        <S.TaskWrapper>
            <S.Wrapper>
                <S.NameText state={state}>{name}</S.NameText>
                <S.DescriptionText>{description}</S.DescriptionText>
                <S.DateText>{formatDate(dueDate)}</S.DateText>
                <S.PriorityText>{`Priority: ${priority}`}</S.PriorityText>
                { (completedBy && state) && <S.CompletedByText>{`Completed by: ${completedBy.name}`}</S.CompletedByText> }
            </S.Wrapper>
            <S.ButtonsWrapper>
                { isCreator && <S.EditButton onClick={handleClick} >Edit</S.EditButton>}
                <S.CompleteButton 
                    onClick={handleCompleteClick}
                    state={state}
                >{state ? 'Completed' : 'Complete'}</S.CompleteButton>
                { isCreator && <S.DeleteButton onClick={handleDeleteClick}>Delete</S.DeleteButton>}
            </S.ButtonsWrapper>
        </S.TaskWrapper>
    );
}

export default Task;