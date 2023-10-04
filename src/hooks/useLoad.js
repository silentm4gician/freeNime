import { useEffect, useState } from "react"

export default function useLoad()
{
    const [loading,setLoading] = useState(true)
    
    useEffect(() => {
        setTimeout(() => setLoading(false), 1500)
        }, [])
        
    return loading
}