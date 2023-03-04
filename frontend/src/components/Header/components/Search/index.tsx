import { ChangeEvent } from 'react';

import SearchInput from 'components/Atoms/SearchInput';
import { useProjects } from 'context/ProjectProvider'


const Search = () => {
    const { projects, setFilteredProjects } = useProjects();

    const handleType = (e: ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        const filteredProjects = searchValue === '' ? projects : projects?.filter( project => project.name.toLowerCase().includes(searchValue.toLowerCase()) )
        setFilteredProjects(filteredProjects || [])
    }

    return (
        <SearchInput placeholder='Search project' id='project_search' onChange={handleType}/>
    )
}

export default Search;
  