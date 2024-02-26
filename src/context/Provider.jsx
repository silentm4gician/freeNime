import { useState } from "react"
import Context from "./Context"

const Provider = ({children}) => 
{
    const baseURL = 'https://leox-consumet-api.vercel.app/'
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