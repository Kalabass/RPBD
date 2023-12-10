import styled from "styled-components";
import { IAccess, IAccessBody } from "../../interfaces/app.interfaces";
import { useInput } from "../../hooks/useInput";
import accessService from "../../services/access.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment-timezone";

interface IModalRightsListWrapperProps{
    height: string;
    color: string;
    bgcolor: string; 
}

const ModalRightsListWrapper = styled.div<IModalRightsListWrapperProps>`
    background-color: ${props => props.bgcolor};
    display: flex;
    flex-direction: row;
    width: 90%;
    margin-left: 5%;
    height:  ${props => props.height};
    color:  ${props => props.color};
`

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
    color: white;
    border: 1px solid white;
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
    margin-inline: 5px;
`

const AcessRequest:React.FC<IAccess> = ({user_id, room_name, access_name, access_id, room_id, id}) => {
    const dateStartInputProps = useInput("");
    const dateEndtInputProps = useInput("");

    const query_client = useQueryClient();

    const CreateAccessMutation = useMutation({
        mutationFn: (access:IAccessBody) => accessService.AddAccess(access),
        mutationKey: ['access', 'create'],
        onSuccess: () => {DeleteAccessRequestMutation.mutate(); query_client.invalidateQueries({queryKey: ['accessesReqs']})}
    })

    const DeleteAccessRequestMutation = useMutation({
        mutationFn: () => accessService.DeleteAxessReq(id),
        mutationKey: ['access', 'delete'],
        onSuccess: () => {query_client.invalidateQueries({queryKey: ['accessesReqs']})},
        onError: () => {console.log(id)}
    })

    const onClickCreateHandler = () => {
        const timeZone = 'Russia/Moscow';
        const data: IAccessBody = {
            user_id: user_id,
            access_id: access_id,
            room_id: room_id,
            enter_time: dateStartInputProps.value == "" ? null :   moment.tz(dateStartInputProps.value, timeZone),
            exit_time: dateEndtInputProps.value == "" ? null :  moment.tz(dateStartInputProps.value, timeZone),
        }
        console.log(data);
        CreateAccessMutation.mutate(data);
        dateStartInputProps.setValue("");
        dateEndtInputProps.setValue("");
    }

    const onClickDeleteHandler = () => {
        DeleteAccessRequestMutation.mutate();
        dateStartInputProps.setValue("");
        dateEndtInputProps.setValue("");
    }

    return (
    <ModalRightsListWrapper bgcolor="" color="black" height="70px">
        <ModalRightsPart borderline="rgb(42, 42, 42)">
            {user_id}
        </ModalRightsPart>
        <ModalRightsPart borderline="rgb(42, 42, 42)">
            {room_name}
        </ModalRightsPart>
        <ModalRightsPart borderline="rgb(42, 42, 42)">
            {access_name}
        </ModalRightsPart>
        <ModalRightsPart borderline="rgb(42, 42, 42)">
            <StyledInput disabled = {access_name != undefined && access_name != "временное"} type = "datetime-local" placeholder="С" {...dateStartInputProps}/>
        </ModalRightsPart>
        <ModalRightsPart borderline="rgb(42, 42, 42)">
            <StyledInput disabled = {access_name != undefined && access_name != "временное"} type = "datetime-local" placeholder="По" {...dateEndtInputProps}/>
        </ModalRightsPart>
        <ModalRightsPart borderline="rgb(42, 42, 42)">
            <StyledButton bgcolor = '#60a020' onClick={onClickCreateHandler}>
                Добавить
            </StyledButton>
            <StyledButton bgcolor = '#a0203a' onClick={onClickDeleteHandler}>
                Удалить
            </StyledButton>
        </ModalRightsPart>
    </ModalRightsListWrapper> 
    );
};

export default AcessRequest;