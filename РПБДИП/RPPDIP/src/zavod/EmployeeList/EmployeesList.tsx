import { useState } from "react";
import { IEmployee } from "../../types/types";
import Employee from "./Employee";

const EmployeesList:React.FC = () => {
    const [employees, setEmployees] = useState<IEmployee[]>([
        {id: 1, is_active: true, name: "вася мерс", role_id: 1},
        {id: 2, is_active: true, name: "василь беха", role_id: 1}
    ]); 
    
    return (
        employees.map((employee) => (
            <Employee {...employee}></Employee>
        ))
    );
};

export default EmployeesList;