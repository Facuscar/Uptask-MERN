const SubmitButton: React.FC<{ value: string }> = ({ value }) => {
    return (
        <input 
            type="submit" 
            value={value} 
            className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5" 
        />
    )
}

export default SubmitButton;