import { useRooms } from "../../../hooks/useRooms";
import Room from "./Room";
import styled from "styled-components";

const StyledRoomContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;

    align-items: center;

    border: 1px solid black;
    margin: 10px;
    
`

const RoomsContainer:React.FC = () => {

    const {isLoading, data} = useRooms();

    return (
        <StyledRoomContainer>
            {
                isLoading ? (
                    <div>Loading....</div>
                ) : data?.length ? (
                    data.map((room) => (
                        <Room id = {room.id} {...room}></Room>
                    ))
                ) : (
                    <div>NotFound...</div>
                )
            }
        </StyledRoomContainer>
    );
};

export default RoomsContainer;