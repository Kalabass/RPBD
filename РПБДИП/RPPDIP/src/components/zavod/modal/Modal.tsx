import styled from "styled-components";
import { useAccessModalStore } from "../../../stores/access.modal.store";
import { useMutation } from "@tanstack/react-query";
import accessService from "../../../services/access.service";
import { useCurrentUserStore } from "../../../stores/CurrentUserStore";
import { useState } from "react";

const ModalWrapper = styled.div`
    position: absolute;
    background-color: rgb(42, 42, 42);
    border: 2px solid #40868c;
    border-radius: 7px;
    margin-left: 25%;
    margin-top: 6%;
    width: 35%;
    height: 40%;
    z-index: 999;

    display: flex;
    flex-direction: column;
`

const ModalHeader = styled.div`
    border-bottom: 2px solid #40868c;
    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
    height: 15%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    font-size: 30px;
`

const ModalBody = styled.div`
    display: flex;
    flex-direction: row; /* изменено значение на row */
    align-items: center; /* выровнять текст по центру */
    color: white;
    font-size: 20px;
    height: 100%;
    text-align: center; /* выровнять текст по центру */
`

const ModalFooter = styled.div`
    height: 15%;
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 40px;
`

const ModalMask = styled.div`
    width: 1000%;
    height: 1000%;
    background-color: black;
    position: fixed;
    margin-top: -50%;
    margin-left: -50%;
    z-index: 997;
    opacity: 0.8;
`

const StyledButton = styled.button`
    background-color: #40868c;
    border-radius: 7px;
    border: 0px;
    width: 180px;
    height: 90%; 
    cursor: pointer;
`

const StyledSelect = styled.select`
    height: 20px;
    border-radius: 7px;
    background-color: rgb(42, 42, 42);
    border: 1px solid #40868c;
    color: white;
`


const Modal:React.FC = () => {
    const {isShown, setIsShown, room} = useAccessModalStore();
    const {currentUser} = useCurrentUserStore();

    const [acessSelectValue, setAcessSelectValue] = useState<number>(1);

    const CreateMutation = useMutation({
        mutationFn: () => accessService.AddAccessReq({user_id: currentUser?.id, room_id: room?.id, access_id: acessSelectValue, start_time: null, end_time: null}),
        mutationKey: ['create', 'access', 'request']
    })

    const OnClickHandler = () => {
        CreateMutation.mutate();
        setIsShown(false);
    }
    
    return (
        <>
            {isShown && (
                <>
                    <ModalMask onClick={() => setIsShown(false)}/>
                    <ModalWrapper>
                        <ModalHeader>
                            У  вас нет доступа к этой комнате
                        </ModalHeader>
                        <ModalBody>
                            <a>Хотитите отправить запрос на получение
                            <a> </a>
                            <StyledSelect value={acessSelectValue} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAcessSelectValue(+e.target.value)}>
                                <option value={2}>временного</option>
                                <option value={1}>постоянного</option>
                                <option value={3}>единоразового</option>
                            </StyledSelect>
                            <a> </a>
                            прохода в
                            <a> </a>
                            <a>"</a>{room != undefined ? room.name : 'error'}<a>"</a>
                            ?</a>
                        </ModalBody>
                        <ModalFooter>
                            <StyledButton onClick={OnClickHandler}>отправить</StyledButton>
                            <StyledButton onClick={() => setIsShown(false)}>закрыть</StyledButton>
                        </ModalFooter>
                    </ModalWrapper>
                </>
            )}
        </>
    );
};

export default Modal;