import { IStudent } from "./types/types";
import styled from "styled-components"

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;

    padding: 5px;
    margin: 5px;

`

const StudentLine:React.FC<IStudent> = (student) => {
    return (
        <Wrapper>
            <input placeholder = "номер зачетки" value={student.n_z}></input>
            <input placeholder = "Имя" value={student.f_name}></input>
            <input placeholder = "Фамилия" value={student.s_name}></input>
            <input placeholder = "Номер группы" value={student.n_gr}></input>
            <input placeholder = "Дата рождения" type = "date" value={student.data_b}></input>
            <input placeholder = "Средний балл" value={student.ball}></input>
            <button>удалить</button>
            <button>обновить</button>
        </Wrapper>
    );
};

export default StudentLine;