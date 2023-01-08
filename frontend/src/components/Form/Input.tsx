const Input: React.FC<{ name: string, type: string, placeholder: string }> = ({ name, type, placeholder }) => {
    return (
            <div className="my-5">
                <label htmlFor={type} className="uppercase text-gray-600 block text-xl font-bold">{name}</label>
                <input id={type} type={type} placeholder={placeholder} className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
            </div>
    )
}

export default Input;