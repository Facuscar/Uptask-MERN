const Alert: React.FC<{ message: string, error?: boolean }> = ({ message, error }) => {
    const classes = error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-600';
    return (
        <div className={`${classes} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10`}>
            {message}
        </div>
    )
}

export default Alert;