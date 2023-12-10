import { useRooms } from "../../../hooks/useRooms";
import Modal from "../modal/Modal";
import Room from "./Room";
import styled from "styled-components";

const StyledRoomContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    margin: 10px;   
`

const RoomsContainer:React.FC = () => {

    const {isLoading, data} = useRooms();

    return (
        <>
            <Modal/>
            <StyledRoomContainer>
                {
                    isLoading ? (
                        <div>Loading....</div>
                    ) : data?.length ? (
                        data.map((room) => (
                            <Room key = {room.id} id = {room.id} {...room}></Room>
                        ))
                    ) : (
                        <div>NotFound...</div>
                    )
                }
            </StyledRoomContainer>
        </>
    );
};

export default RoomsContainer;