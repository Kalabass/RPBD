import { IEmployee } from "../../types/types";

const Employee:React.FC<IEmployee> = ({id, is_active, name, role_id}) => {
    return (
        <div>
            {`id: ${id}, is_active: ${is_active}, name: ${name}, role_id: ${role_id} `}
        </div>
    );
};

export default Employee;