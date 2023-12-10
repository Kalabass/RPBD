import styled from "styled-components";
import { useUsers } from "../../hooks/useUsers";
import Employee from "./Employee";
import EmploeesHeader from "./EmploeesHeader";
import Modal from "./Modal/Modal";
import { useState } from "react";
import EmployeeCreation from "./EmployeeCreation";
import { useCurrentUserModalStore } from "../../stores/current.user.modal";
import { IUser } from "../../interfaces/app.interfaces";

const EmployeesListWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const EmployeesList:React.FC = () => {

    const {data, isLoading} = useUsers();

    const [isModalShow, setIsModalShow] = useState<boolean>(false);

    const {userChange} = useCurrentUserModalStore();

    const ModalOpen = (user: IUser) => {
        setIsModalShow(true);
        userChange(user);
    }

    const ModalCLose = () => {
        setIsModalShow(false);
    }

    return (
        <EmployeesListWrapper>
            {isModalShow && <Modal onClick={ModalCLose} isShow = {true}></Modal>}
            <EmployeeCreation/>
            <EmploeesHeader></EmploeesHeader>
            {isLoading ? (
                <div>Loading...</div>
            ) : data?.length ? (
                data.map((user) => (
                    <Employee modalOpen = {ModalOpen} key={user.id} {...user}></Employee>
                ))
            ): (
                <div> NotFound....</div>
            )}
        </EmployeesListWrapper>
    );
};

export default EmployeesList;