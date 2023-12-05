import styled from "styled-components";
import { useUsers } from "../../hooks/useUsers";
import Employee from "./Employee";
import EmploeesHeader from "./EmploeesHeader";
import Modal from "./Modal";
import { useState } from "react";

const EmployeesListWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const EmployeesList:React.FC = () => {

    const {data, isLoading} = useUsers();

    const [isModalShow, setIsModalShow] = useState<boolean>(false);

    const ModalOpen = () => {
        setIsModalShow(true);
    }

    const ModalCLose = () => {
        setIsModalShow(false);
    }

    return (
        <EmployeesListWrapper>
            {isModalShow && <Modal onClick={ModalCLose} isShow = {true}></Modal>}
            <EmploeesHeader></EmploeesHeader>
            {isLoading ? (
                <div>Loading...</div>
            ) : data?.length ? (
                data.map((user) => (
                    <Employee onClick = {ModalOpen} key={user.id} {...user}></Employee>
                ))
            ): (
                <div> NotFound....</div>
            )}
        </EmployeesListWrapper>
    );
};

export default EmployeesList;