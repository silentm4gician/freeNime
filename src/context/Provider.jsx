import { useState } from "react"
import Context from "./Context"

const Provider = ({children}) => 
{
    const baseURL = import.meta.env.VITE_base_URL
    const [list,setList] = useState()
    const [search,setSearch] = useState()
    const [endIndex,setEndIndex] = useState(30)

    return (
        <Context.Provider
            value={
                {
                    baseURL,
                    list,setList,
                    search,setSearch,
                    endIndex,setEndIndex
                }}
        >
            {children}
        </Context.Provider>
    )
}

export default Provider