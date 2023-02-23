import { Task as TaskType } from "types/Task";
import { formatDate } from "utils/formatDate";

import * as S from './styles';

type TaskProps = {
    setCurrentTask: (task: TaskType) => void;
    setDeleteModal: (v: boolean) => void;
    setShowModal: (v: boolean) => void;
    task: TaskType;
};

const Task: React.FC<TaskProps> = ({ task, setShowModal, setCurrentTask, setDeleteModal }) => {
    const { description, name, dueDate, priority, state } = task

    const handleClick = () => {
        setShowModal(true);
        setCurrentTask(task);
    };

    const handleDeleteClick = () => {
        setDeleteModal(true);
        setCurrentTask(task);
    }

    return (
        <S.TaskWrapper>
            <S.Wrapper>
                <S.NameText state={state}>{name}</S.NameText>
                <S.DescriptionText>{description}</S.DescriptionText>
                <S.DateText>{formatDate(dueDate)}</S.DateText>
                <S.PriorityText>{`Priority: ${priority}`}</S.PriorityText>
            </S.Wrapper>
            <S.ButtonsWrapper>
                <S.EditButton onClick={handleClick} >Edit</S.EditButton>
                <S.CompleteButton state={state}>{state ? 'Completed' : 'Complete'}</S.CompleteButton>
                <S.DeleteButton onClick={handleDeleteClick}>Delete</S.DeleteButton>
            </S.ButtonsWrapper>
        </S.TaskWrapper>
    );
}

export default Task;