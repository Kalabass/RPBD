import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface IStyledButtonProps extends ButtonHTMLAttributes<HTMLInputElement>{}

const BUTTON = styled.button<IStyledButtonProps>`
    background-color: #40868c;
    border-radius: 7px;
    border: 0px;
    cursor: pointer;
    width: 60%;
    height: 40px;
    font-size: 20px;
`

const StyledButton:React.FC<IStyledButtonProps> = (props) => {
    return (
        <BUTTON {...props}></BUTTON>
    );
};

export default StyledButton;