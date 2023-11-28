import styled from "styled-components";
import { IUser } from "../../interfaces/app.interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import usersService from "../../services/users.service";

const StyledEmployee = styled.div`
    display:flex;
    flex-direction: row;
`

const EmploeePart = styled.div`
    border: 1px solid #40868c;
    color: white;
    width: 100%;
    display: flex;
    align-items: center; 
    justify-content: center; 
    padding: 3px;
`

interface IEmploeeButtonProps {
    color: string;
}

const EmploeePartButtonsContainer = styled.div`
    border: 1px solid #40868c;
    color: white;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center; 
    justify-content: space-evenly; 
    padding: 3px;
`


const EmploeeButton = styled.button<IEmploeeButtonProps>`
    background-color: ${props => props.color};
    border-radius: 3px;
    border: 0px;
    height: 50%;
    width: 30%;
    cursor: pointer;    
`

const Employee:React.FC<IUser> = ({id, is_active, name, role_name}) => {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: number) => usersService.delete(id),
        mutationKey: ['delete employee'],
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']});
        }
    })

    const DeleteOnClickHandler =  () => {
        if(id != undefined)
            mutation.mutate(id);
       
    }

    return (
        <StyledEmployee>
            <EmploeePart>{id}</EmploeePart>
            <EmploeePart>{name}</EmploeePart>
            <EmploeePart>{role_name}</EmploeePart>
            <EmploeePart>{`${is_active}`}</EmploeePart>
            <EmploeePartButtonsContainer>
                <EmploeeButton color="#a0203a" onClick = {DeleteOnClickHandler}>удалить</EmploeeButton>
                <EmploeeButton color="#40868c">инфо</EmploeeButton>
            </EmploeePartButtonsContainer>
        </StyledEmployee>
        
    );
};

export default Employee;