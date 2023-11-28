import { useEffect, useState } from "react"

export default function useLoad()
{
    const [loading,setLoading] = useState(true)
    
    useEffect(() => {
        setTimeout(() => setLoading(false), 2300)
        }, [])
        
    return loading
}