import styled from "styled-components";
import { IRoom } from "../../../interfaces/app.interfaces";
import { useMutation } from "@tanstack/react-query";
import { useCurrentUserStore } from "../../../stores/CurrentUserStore";
import logsService from "../../../services/logs.service";
import { useCurrentRoomStore } from "../../../stores/current.room.store";

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

const Room:React.FC<IRoom> = ({ id, name, max_duration}) => {

    const {currentUser} = useCurrentUserStore();
    const {currentRoom} = useCurrentRoomStore();


    const mutation = useMutation({
       mutationFn: () => logsService.AddLog({user_id: currentUser?.id, room_id: id, enter_time: new Date()}),
       mutationKey: ['create log'],
    })

    const onclickHandler = () => {
        mutation.mutate();
    }

    return (
        <StyledRoom onClick={onclickHandler}>
            <h4>
                {name}
            </h4>
            <div>
                {`Не более`}
            </div>
            <div>
                {`${max_duration} ч.`}
            </div>
            {currentRoom == undefined && <button>выйти</button>}
        </StyledRoom>
    );
};

export default Room;