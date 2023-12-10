import styled from "styled-components";
import { useInput } from "../../../hooks/useInput";
import { useCurrentUserModalStore } from "../../../stores/current.user.modal";
import React, { useState } from "react";

const ProfileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 25%;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-left: 40px;

`

const ProfileImgContainer = styled.div`
    border: 2px solid #40868c;
`

const ProfileINputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

`

const StyledInput = styled.input`
    width: 256px;
    height: 40px;
    text-align: center;
    background-color: rgb(53, 53, 53);
    color: white;
    border-radius: 7px;
    border: 2px solid #40868c;
`

const StyledSelect = styled.select`
    width: 256px;
    height: 40px;
    text-align: center;
    background-color: rgb(53, 53, 53);
    color: white;
    border-radius: 7px;
    border: 2px solid #40868c;
`

const RoleDictionary: Record<string, number> = {
    'ADMIN' : 1,
    'EMPLOYEE': 2
}

const ModalProfile:React.FC = () => {

    const {currentUser} = useCurrentUserModalStore();
    const nameInputProps = useInput(currentUser?.name);
    const [selectValue, setSelectValue] = useState<number>(RoleDictionary[currentUser?.role_name]);

    return (
        <ProfileWrapper>
            <ProfileImgContainer>
                <img src = "https://xsgames.co/randomusers/avatar.php?g=male" alt="User Profile"/>
            </ProfileImgContainer>
            <ProfileINputContainer>
                <StyledInput placeholder="Имя" {...nameInputProps}></StyledInput>
                <StyledSelect value={selectValue} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {setSelectValue(+e.target.value)}}>
                    <option value = {1}> Админ</option>
                    <option value= {2}>  Рабочий</option>
                </StyledSelect>
            </ProfileINputContainer>
        </ProfileWrapper>
    );
};

export default ModalProfile;