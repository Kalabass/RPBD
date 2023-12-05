import styled from "styled-components";
import { IRoom } from "../../../interfaces/app.interfaces";
import { useMutation } from "@tanstack/react-query";
import { useCurrentUserStore } from "../../../stores/CurrentUserStore";
import logsService from "../../../services/logs.service";
import { useCurrentRoomStore } from "../../../stores/current.room.store";
import { useEffect, useState } from "react";

const StyledRoom = styled.div`
    width: 170px;
    height: 170px;
    background-color: #716363;
    display: flex;
    flex-direction:column;
    align-items: center; 
    justify-content: center; 
    border: 1px solid black;

    cursor: pointer;
`

const StyledButton = styled.button`
    padding: 10px;
    background-color: #40868c;
    padding: 5px;
    border-radius: 7px;
`

const StyledButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`

const Room:React.FC<IRoom> = ({ id, name, max_duration}) => {

    const {currentUser} = useCurrentUserStore();
    const {currentRoom, roomChange} = useCurrentRoomStore();

    useEffect(() => {
        switch (currentRoom?.id){
            case undefined:{
                setIsEnterDisabled(false);
                setIsExitDisabled(true);
                break;
            }
            case id:{
                setIsEnterDisabled(true);
                setIsExitDisabled(false); 
                break;
            }
            default:{
                setIsEnterDisabled(true);
                setIsExitDisabled(true); 
                break;        
            }
        }            
    }, [currentRoom])
    



    const [isEnterDisabled, setIsEnterDisabled] = useState<boolean>(false);
    const [isExitDisabled, setIsExitDisabled] = useState<boolean>(true);

    const enterMutation = useMutation({
       mutationFn: () => logsService.AddLog({user_id: currentUser?.id, room_id: id, enter_time: new Date()}),
       mutationKey: ['create log'],
    })

    const leaveMutation = useMutation({
        mutationFn: () => logsService.AddExitLog({user_id: currentUser?.id, exit_time: new Date()}),
        mutationKey: ['upd log']
    })

    const onclickHandlerEnter = () => {
        enterMutation.mutate();
        roomChange({id, name, max_duration});
    }

    const onclickHandlerExit = () => {
        leaveMutation.mutate();
        roomChange({});
    }

    return (
        <StyledRoom>
            <h4>
                {name}
            </h4>
            <div>
                {`Не более`}
            </div>
            <div>
                {`${max_duration} ч.`}
            </div>
            <StyledButtonsContainer>
                <StyledButton disabled ={isEnterDisabled} onClick={onclickHandlerEnter}>enter</StyledButton>
                <StyledButton disabled ={isExitDisabled} onClick={onclickHandlerExit}>exit</StyledButton>
            </StyledButtonsContainer>
        </StyledRoom>
    );
};

export default Room;