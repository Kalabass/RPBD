import styled from "styled-components";
import EmployeesList from "./EmployeeList/EmployeesList";
import RoomsContainer from "./Rooms/RoomsContainer";
import Header from "../Header/Header";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const ZavodPage:React.FC = () => {
    return (
        <>        
            <Header/>
            <Wrapper>
                <EmployeesList/>
                <RoomsContainer/>
            </Wrapper>
        </>

    );
};

export default ZavodPage;