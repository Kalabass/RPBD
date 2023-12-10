import styled from "styled-components";
import { useInput } from "../../hooks/useInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import usersService from "../../services/users.service";
import { useState } from "react";

const CreationWrapper = styled.div`
    display: flex;
    height: 40px;
    margin-bottom: 20px;
    margin-top: 20px;
`

const CreationPart = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const StyledInput = styled.input`
    width: 60%;
    height: 90%;
    text-align: center;
    background-color: rgb(53, 53, 53);
    color: white;
    border-radius: 7px;
    border: 2px solid #40868c;
`

const StyledSelect = styled.select`
    width: 60%;
    height: 90%;
    text-align: center;
    background-color: rgb(53, 53, 53);
    color: white;
    border-radius: 7px;
    border: 2px solid #40868c;
`

const StyledButton = styled.button`
    width: 60%;
    height: 90%;
    background-color: #60a020;
    border-radius: 7px;
    border: 2px solid #60a020;
    cursor: pointer;
`

const EmployeeCreation:React.FC = () => {

    const queryClient = useQueryClient();

    const MutationCreateUser = useMutation({
        mutationFn: () => usersService.create({name: nameInputProps.value, mail: ageInputProps.value, role_id: roleId, password: passwordInputProps.value}),
        mutationKey: ['user', 'create'],
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']});
        }
    })

    const nameInputProps = useInput("");
    const ageInputProps = useInput("");
    const passwordInputProps = useInput("");
    const [roleId, setRoleId] = useState<number>(1);

    const HandleSelectChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setRoleId(+e.target.value);
    }

    const OnClickHandler = () => {
        MutationCreateUser.mutate();
    }

    return (
        <CreationWrapper>
            <CreationPart>
                <StyledInput placeholder="Имя" {...nameInputProps}></StyledInput>
            </CreationPart>
            <CreationPart>
                <StyledInput placeholder="Электронная почта" {...ageInputProps}></StyledInput>
            </CreationPart>
            <CreationPart>
                <StyledInput placeholder="Пароль" type = "password" {...passwordInputProps}></StyledInput>
            </CreationPart>
            <CreationPart>
                <StyledSelect value={roleId} onChange={HandleSelectChange}>
                    <option value = {1}>Админ</option>
                    <option value = {2}>Рабочий</option>
                </StyledSelect>
            </CreationPart>
            <CreationPart>
                <StyledButton onClick={OnClickHandler}>создать</StyledButton>
            </CreationPart>
        </CreationWrapper>
    );
};

export default EmployeeCreation;