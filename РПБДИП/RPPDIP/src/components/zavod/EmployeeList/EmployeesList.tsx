import Employee from "./Employee";
import styled from "styled-components";
import { useUsers } from "../../../hooks/useUsers";
import { useCurrentUserStore } from "../../../stores/CurrentUserStore";
import { useAuthUser } from "../../../hooks/useAuthorizedUser";

const EmployeesListContainer = styled.div`
    margin: 10px;
    border-radius: 7px;
    border: 2px solid #40868c;
    background-color: rgb(53, 53, 53);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: white;
`


const EmployeesList:React.FC = () => {
    const {isLoading, data} = useUsers();
    const {currentUser} = useCurrentUserStore();

    const roleId = useAuthUser().data?.role_id;

    return (
        <>
            {roleId == 1 ? <EmployeesListContainer>
                {/* <EmployeesListHeader/> */}
                    {isLoading ? (
                        <div>loading...</div>
                    ) :data?.length ? (
                        data.map((user) => (
                            <Employee key={user.id} {...user} bgColor={currentUser?.id === user.id ? "#40868c" : "rgb(36, 36, 36)"} />  
                        ))
                    ) : (
                        <div>NotFound...</div>
                    )
                }
            </EmployeesListContainer>: <></>}
        </>
    );
};

export default EmployeesList;