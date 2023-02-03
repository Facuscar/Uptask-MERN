import React from "react";

type SelectProps = {
    name: string, 
    placeholder?: string, 
    id: string,
    defaultValue?: string,
    options: string[],
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ name, placeholder, id, defaultValue, options }, ref) => {
    return (
            <div className="my-5">
                <label htmlFor={id} className="uppercase text-gray-600 block text-xl font-bold">{name}</label>
                <select id={id} placeholder={placeholder} className="w-full mt-3 p-3 border rounded-xl bg-gray-50" ref={ref} defaultValue={defaultValue} >
                    {options.map( option => <option value={option}>{option}</option> )}
                </select>
            </div>
    )
});

export default Select;