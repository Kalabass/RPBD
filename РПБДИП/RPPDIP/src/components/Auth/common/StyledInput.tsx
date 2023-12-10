import { InputHTMLAttributes } from "react";
import styled from "styled-components";
interface IStyledInputProps extends InputHTMLAttributes<HTMLInputElement>{}



const INPUT = styled.input<IStyledInputProps>`
    text-align: center;
    border: 1px solid #40868c;
    border-radius: 7px;
    background-color: rgb(53, 53, 53);
    color: white;
    width: 60%;
    height: 40px;
    font-size: 20px;
`

const StyledInput:React.FC<IStyledInputProps> = (props) => {
    return (
        <INPUT{...props}></INPUT>
    );
};

export default StyledInput;