import WarningIcon from "../../Atoms/WarningIcon";

type ConfirmDeleteProps = {
    deleteTask: () => void;
    setShowModal: (v: boolean) => void
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({ deleteTask, setShowModal }) => {
    return (
        <>
            <div className="mt-2 flex gap-2 items-center">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <WarningIcon />
                </div>
                <p className="text-sm text-gray-500">This action is irreversible!</p>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={deleteTask}
                >Delete</button>
                <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setShowModal(false)}
                >Cancel</button>
            </div>
        </>
    )
}

export default ConfirmDelete;