import styled from "styled-components";
import EmployeesList from "./EmployeeList/EmployeesList";
import RoomsContainer from "./Rooms/RoomsContainer";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const ZavodPage:React.FC = () => {
    return (
        <Wrapper>
            <EmployeesList/>
            <RoomsContainer/>
        </Wrapper>
    );
};

export default ZavodPage;