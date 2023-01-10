const Input: React.FC<{ name: string, type: string, placeholder: string, id?: string }> = ({ name, type, placeholder, id }) => {
    return (
            <div className="my-5">
                <label htmlFor={id || type} className="uppercase text-gray-600 block text-xl font-bold">{name}</label>
                <input id={id || type} type={type} placeholder={placeholder} className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
            </div>
    )
}

export default Input;