import { ReactNode } from "react"

export const BottomWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="mt-20 md:mt-5 shadow:lg px-5 py-10 rounded-xl bg-white">{children}</div>
}