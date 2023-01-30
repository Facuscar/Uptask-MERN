import React from "react";

type InputProps = {
    name: string, 
    type: string,
    placeholder?: string, 
    id?: string,
    defaultValue?: string,
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ name, type, placeholder, id, defaultValue }, ref) => {
    return (
            <div className="my-5">
                <label htmlFor={id || type} className="uppercase text-gray-600 block text-xl font-bold">{name}</label>
                <input id={id || type} type={type} placeholder={placeholder} className="w-full mt-3 p-3 border rounded-xl bg-gray-50" ref={ref} defaultValue={defaultValue} />
            </div>
    )
});

export default Input;