import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { useRooms } from "../../../hooks/useRooms";
import { useAccess } from "../../../hooks/useAccess";
import { useCurrentUserModalStore } from "../../../stores/current.user.modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import accessService from "../../../services/access.service";
import { IAccessBody } from "../../../interfaces/app.interfaces";
import { useInput } from "../../../hooks/useInput";
import moment from 'moment-timezone';

const ModalRightsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 35px;
    overflow-y: auto;
    max-height: 90%;
    align-items: center;
    padding-left: 50px;
`

interface IModalRightsListWrapperProps{
    height: string;
    color: string;
    bgcolor: string; 
}

interface IModalRightsPartProps{
    borderline?:string
}

const ModalRightsPart = styled.div<IModalRightsPartProps>`
    border: 1px solid ${(props) => (props.borderline ? props.borderline : 'white')};
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
`

const ModalRightsListWrapper = styled.div<IModalRightsListWrapperProps>`
    background-color: ${props => props.bgcolor};
    display: flex;
    flex-direction: row;
    width: 95%;
    height:  ${props => props.height};
    color:  ${props => props.color};
`

interface IStyledButtonProps{
    bgcolor: string; 
}


const StyledButton = styled.button<IStyledButtonProps>`
    width: 80%;
    height: 50%;
    background-color: ${props => props.bgcolor};
    border-radius: 7px;
    border: 0px;
    cursor: pointer;
`

const MainTable = styled.div`
    width: 100%;
`

const AddRight = styled.div`
    width: 100%;
    margin-bottom: 35px;
`

const StyledInput = styled.input`
    width: 90%;
    height: 60%;
    text-align: center;
    background-color: rgb(53, 53, 53);
    color: white;
    border-radius: 7px;
    border: 2px solid #40868c;
`

const StyledSelect = styled.select`
    width: 90%;
    height: 60%;
    text-align: center;
    background-color: rgb(53, 53, 53);
    color: white;
    border-radius: 7px;
    border: 2px solid #40868c;
`

const RoomDictionary: Record<number, string> = {

}

const ModalRights: React.FC = () => {

    const {currentUser} = useCurrentUserModalStore();
    const roomsData = useRooms().data;
    const accessData = useAccess(currentUser?.id).data;
    
    const [isInputDateDisabled, setIsInputDateDisabled] = useState<boolean>(true);

    const [roomOption, setRoomOption] = useState<number>(1  );
    const [accessOption, setAccessOption] = useState<number>(1);

    const dateStartInputProps = useInput("");
    const dateEndtInputProps = useInput("");

    const query_client = useQueryClient();

    const DeleteAccessMutation = useMutation({
        mutationFn: (id:number) => accessService.DeleteAxess(id),
        mutationKey: ['access', 'delete'],
        onSuccess: () => {query_client.invalidateQueries({queryKey: ['accesses']})}
    })

    const CreateAccessMutation = useMutation({
        mutationFn: (access:IAccessBody) => accessService.AddAccess(access),
        mutationKey: ['access', 'create'],
        onSuccess: () => {query_client.invalidateQueries({queryKey: ['accesses']})}
    })

    const onClickHandler = () => {
        const timeZone = 'Russia/Moscow';

        const data: IAccessBody = {
            user_id: currentUser?.id,
            access_id: accessOption,
            room_id: roomOption,
            enter_time: dateStartInputProps.value == "" ? null : moment.tz(dateStartInputProps.value, timeZone),
            exit_time: dateEndtInputProps.value == "" ? null :  moment.tz(dateEndtInputProps.value, timeZone),
        }

        CreateAccessMutation.mutate(data);
        dateStartInputProps.setValue("");
        dateEndtInputProps.setValue("");
    }

    return (
      <ModalRightsWrapper>
        <AddRight>
            <ModalRightsListWrapper bgcolor="" color="black" height="70px">
                <ModalRightsPart borderline="rgb(42, 42, 42)">
                    {roomsData != undefined && <StyledSelect value = {roomOption} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRoomOption(+e.target.value)}>
                        {roomsData.map((room) => (
                            <option  value={room.id}>{room.name}</option>
                        ))}
                    </StyledSelect>}
                </ModalRightsPart>
                <ModalRightsPart borderline="rgb(42, 42, 42)">
                    <StyledSelect onChange={(e: ChangeEvent<HTMLSelectElement>) => { setAccessOption(+e.target.value); setIsInputDateDisabled(true); if(e.target.value == "2") setIsInputDateDisabled(false) }}>
                        <option value = {1}>Постоянный</option>
                        <option value={2}>Временный</option>
                        <option value={3}>Единичный</option>
                    </StyledSelect>
                </ModalRightsPart>
                <ModalRightsPart borderline="rgb(42, 42, 42)">
                    <StyledInput disabled = {isInputDateDisabled} type = "datetime-local" placeholder="С" {...dateStartInputProps}/>
                </ModalRightsPart>
                <ModalRightsPart borderline="rgb(42, 42, 42)">
                    <StyledInput disabled = {isInputDateDisabled} type = "datetime-local" placeholder="По" {...dateEndtInputProps}/>
                </ModalRightsPart>
                <ModalRightsPart borderline="rgb(42, 42, 42)">
                    <StyledButton bgcolor = '#60a020' onClick={onClickHandler}>
                        Добавить
                    </StyledButton>
                </ModalRightsPart>
            </ModalRightsListWrapper> 
        </AddRight>

        <MainTable>
            <ModalRightsListWrapper bgcolor="#40868c" color="black" height="50px">
                <ModalRightsPart>Комната</ModalRightsPart>
                <ModalRightsPart>Тип доступа</ModalRightsPart>
                <ModalRightsPart>С</ModalRightsPart>
                <ModalRightsPart>По</ModalRightsPart>
                <ModalRightsPart></ModalRightsPart>
            </ModalRightsListWrapper> 

            {accessData?.map((item, index) => (
                <ModalRightsListWrapper bgcolor="" color = "white" height ="60px" key={index}> 
                    <ModalRightsPart>{item.room_name}</ModalRightsPart>
                    <ModalRightsPart>{item.access_name}</ModalRightsPart>
                    <ModalRightsPart>{item.start_time == undefined ? "" : moment(item.start_time).tz('Russia/Moscow').toLocaleString()}</ModalRightsPart>
                    <ModalRightsPart>{item.end_time == undefined ? "" : moment(item.end_time).tz('Russia/Moscow').toLocaleString()}</ModalRightsPart>
                    <ModalRightsPart>
                        <StyledButton bgcolor = '#a0203a' onClick={() => {console.log(item.start_time?.toLocaleString().length); DeleteAccessMutation.mutate(item.id)}}>
                            удалить
                        </StyledButton>
                    </ModalRightsPart>
                </ModalRightsListWrapper>
            ))}
        </MainTable>
      </ModalRightsWrapper>
    );
  };
  

export default ModalRights;