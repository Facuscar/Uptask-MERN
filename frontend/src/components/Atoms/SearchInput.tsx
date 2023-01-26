import React from "react";

type SearchInputProps = {
    placeholder: string, 
    id: string,
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(({ placeholder, id }, ref) => {
    return <input id={id} type="serach" placeholder={placeholder} className="rounded-lg lg-w-96 block p-2 border" ref={ref} />
});

export default SearchInput;