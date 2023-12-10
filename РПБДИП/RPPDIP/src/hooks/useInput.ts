import { useState } from "react";

export function useInput(initValue: string){
    const [value, setValue] = useState<string>(initValue);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setValue(e.target.value);
    }

    const inputProps = {
        value: value,
        onChange: handleChange,
        setValue
    }

    return inputProps;
}