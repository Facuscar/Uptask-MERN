import React from "react";
import { HTMLAttributes } from 'react';

type SearchInputProps = {
    placeholder: string, 
    id: string,
}

const SearchInput : React.FC<HTMLAttributes<HTMLInputElement> & SearchInputProps> = ({ placeholder, id, ...props }) => {
    return <input id={id} type="serach" placeholder={placeholder} className="rounded-lg lg-w-96 block p-2 border" {...props} />
};

export default SearchInput;