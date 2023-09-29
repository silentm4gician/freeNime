import { useContext, useEffect, useState } from "react";
import Context from "../context/Context";

export default function useFetch (link)
{
    const {baseURL} = useContext(Context)
    const [list,setList] = useState()

    useEffect(() => {
        fetch(baseURL+link)
        .then(res=>res.json())
        .then(data => setList(data))
    }, [])

    return list
}