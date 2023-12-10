import styled from "styled-components";
import StyledButton from "./common/StyledButton";
import StyledInput from "./common/StyledInput";
import { useMutation } from "@tanstack/react-query";
import usersService from "../../services/users.service";
import { useInput } from "../../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { useCurrentUserStore } from "../../stores/CurrentUserStore";
import { useAuthUser } from "../../hooks/useAuthorizedUser";

const StyledA = styled.a`
    font-size: 15px;
    cursor: pointer;
    border-bottom: 1px solid white;
`

interface ILoginProps{
    onClick : () => void;
}

const Login:React.FC<ILoginProps> = ({onClick}) => {

    const navigate = useNavigate();
    const {userChange} = useCurrentUserStore();
    const {data} = useAuthUser();

    const LoginMutation = useMutation({
        mutationFn: () => usersService.login({mail: mailInputProps.value, password: passwordInputProps.value}),
        mutationKey: ['login'],
        onSuccess: () => {navigate('/main'); userChange({...data})},
        onError: () => alert('что-то пошло не так')
    })

    const mailInputProps = useInput("");
    const passwordInputProps = useInput("");


    return (
        <>
            <StyledInput placeholder="Почта" {...mailInputProps}></StyledInput>
            <StyledInput type = "password" placeholder="Пароль" {...passwordInputProps}></StyledInput>
            <StyledButton onClick={() => LoginMutation.mutate()}>Вход</StyledButton>
            <StyledA onClick={onClick}>Ещё нет аккаунта?</StyledA>
        </>
    );
};

export default Login;