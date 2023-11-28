import styled from "styled-components";
import { useUsers } from "../../hooks/useUsers";
import Employee from "./Employee";
import EmploeesHeader from "./EmploeesHeader";

const EmployeesListWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const EmployeesList:React.FC = () => {

    const {data, isLoading} = useUsers();

    return (
        <EmployeesListWrapper>
            <EmploeesHeader></EmploeesHeader>
            {isLoading ? (
                <div>Loading...</div>
            ) : data?.length ? (
                data.map((user) => (
                    <Employee key={user.id} {...user}></Employee>
                ))
            ): (
                <div> NotFound....</div>
            )}
        </EmployeesListWrapper>
    );
};

export default EmployeesList;