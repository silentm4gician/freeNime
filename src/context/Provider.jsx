import { useState } from "react"
import Context from "./Context"

const Provider = ({children}) => 
{
    const baseURL = 'https://api.consumet.org/anime/gogoanime/'
    const [list,setList] = useState()
    const [search,setSearch] = useState()

    return (
        <Context.Provider
            value={
                {
                    baseURL,
                    list,setList,
                    search,setSearch,

                }}
        >
            {children}
        </Context.Provider>
    )
}

export default Provider