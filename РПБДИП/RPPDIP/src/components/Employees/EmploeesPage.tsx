import styled from "styled-components";
import EmployeesList from "./EmployeesList";

const EmployeePageWrapper = styled.div`
    width: 90%;
    margin-left: 5%;
`

const EmploeesPage:React.FC = () => {
    return (
        <EmployeePageWrapper>
            {/* <EmployeeCreation/> */}
            <EmployeesList/>
        </EmployeePageWrapper>
    );
};

export default EmploeesPage;