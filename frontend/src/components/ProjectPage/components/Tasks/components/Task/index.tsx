import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Task as TaskType } from "types/Task";
import { formatDate } from "utils/formatDate";
import { getConfig } from "utils/getConfig";

import * as S from './styles';

type TaskProps = {
    isCreator: boolean;
    setCurrentTask: (task: TaskType) => void;
    setDeleteModal: (v: boolean) => void;
    setShowModal: (v: boolean) => void;
    task: TaskType;
};

const Task: React.FC<TaskProps> = ({ task, setShowModal, setCurrentTask, setDeleteModal, isCreator }) => {
    const navigate = useNavigate();

    const { description, name, dueDate, priority, state, _id } = task

    const handleClick = () => {
        setShowModal(true);
        setCurrentTask(task);
    };

    const handleDeleteClick = () => {
        setDeleteModal(true);
        setCurrentTask(task);
    }

    const handleCompleteClick = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }

            console.log(`${import.meta.env.VITE_API_TASKS_URL}/state/${_id}`);

            const { data } = await axios.post(`${import.meta.env.VITE_API_TASKS_URL}/state/${_id}`, {}, getConfig(token));

            console.log(data);
        } catch (error: any) {
            console.log(error.response.data);
        }
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