import Employee from "./Employee";
import styled from "styled-components";
import { useUsers } from "../../../hooks/useUsers";
import { useCurrentUserStore } from "../../../stores/CurrentUserStore";

const EmployeesListContainer = styled.div`
    margin: 10px;
    border-radius: 8px;
    background-color: #464343;
    background-color: #c8a98f;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
`

// const EmployeesListHeader = styled.div`
//     height: 3%;
//     width: 100%;    
//     margin-bottom: 5px;
//     border-top-right-radius: 8px;
//     border-top-left-radius: 8px;
//     border-bottom: 2px solid rgb(42, 42, 42);
// `

const EmployeesList:React.FC = () => {
    const {isLoading, data} = useUsers();
    const {currentUser} = useCurrentUserStore();


    return (
        <EmployeesListContainer>
            {/* <EmployeesListHeader/> */}
                {isLoading ? (
                    <div>loading...</div>
                ) :data?.length ? (
                    data.map((user) => (
                            <Employee key={user.id} {...user} bgColor={currentUser?.id === user.id ? "#40868c" : "#987654"} />  
                    ))
                ) : (
                    <div>NotFound...</div>
                )
            }
        </EmployeesListContainer>
    );
};

export default EmployeesList;