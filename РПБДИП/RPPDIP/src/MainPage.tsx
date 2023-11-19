import { useEffect, useState } from "react";
import axios from "axios";
import { IStudent } from "./types/types";
import StudentLine from "./StudentLine";



const MainPage:React.FC = () => {
    useEffect(() => {
        FetchStudents();
    }, []);
    const [students, setStudents] = useState<IStudent[]>([{n_z: 1, f_name: "vasya", s_name: "punk"}, {n_z: 2, f_name: "Otec", s_name: "Piva"}]);

    const FetchStudents = async () => {
        try {
            const responce: {data: IStudent[]} = await axios.get('http://localhost:9009/api/students', {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            })
            console.log();
            setStudents(responce.data);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <>
            <h1>Test</h1>
            {students.map((student) => (
                <>
                    <StudentLine {...student}></StudentLine>
                </>
            ))}
        </>
    );
};

export default MainPage;