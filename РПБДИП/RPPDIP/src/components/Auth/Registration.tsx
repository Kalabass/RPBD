import styled from "styled-components";
import StyledButton from "./common/StyledButton";
import StyledInput from "./common/StyledInput";
import { useInput } from "../../hooks/useInput";
import { useMutation } from "@tanstack/react-query";
import usersService from "../../services/users.service";
import { useNavigate } from "react-router-dom";

const StyledA = styled.a`
    font-size: 15px;
    cursor: pointer;
    border-bottom: 1px solid white;
`

interface IRegistrationProps{
    onClick : () => void;
}


const Registration:React.FC<IRegistrationProps> = ({onClick}) => {

    const mailInputProps = useInput("");
    const nameInputProps = useInput("");
    const passwordInputProps = useInput("");

    const navigate = useNavigate();

    const RegistrationMutation = useMutation({
        mutationFn: () => usersService.registration({name: nameInputProps.value, mail: mailInputProps.value, password: passwordInputProps.value}),
        mutationKey: ['login'],
        onSuccess: () => navigate('/main'),
        onError: () => alert('что-то пошло не так')
    })

    return (
        <>        
            <StyledInput placeholder="Имя" {...nameInputProps}></StyledInput>
            <StyledInput placeholder="почта" {...mailInputProps}></StyledInput>
            <StyledInput type = "password" {...passwordInputProps} placeholder="Пароль"></StyledInput>
            <StyledButton onClick={() => RegistrationMutation.mutate()}>Регистрация</StyledButton>
            <StyledA onClick={onClick}>Уже есть аккаунт?</StyledA>
        </>
    );
};

export default Registration;