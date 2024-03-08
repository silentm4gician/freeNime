import { useEffect } from "react"
import useFetch from "./useFetch"

export default function usePages(link)
{
    const page = localStorage.getItem('page')
    const results = useFetch(link+page)

    useEffect(()=>
    {
        localStorage.setItem('page',1)
    },[])

    return results
}