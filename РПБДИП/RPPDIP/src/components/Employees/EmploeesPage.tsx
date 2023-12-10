import styled from "styled-components";
import EmployeesList from "./EmployeesList";
import Header from "../Header/Header";

const EmployeePageWrapper = styled.div`
    width: 90%;
    margin-left: 5%;
`

const EmploeesPage:React.FC = () => {
    return (
        <>
            <Header/>
            <EmployeePageWrapper>
                <EmployeesList/>
            </EmployeePageWrapper>
        </>
    );
};

export default EmploeesPage;