import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import ReactPlayer from 'react-player'
import Search from './Search'

const Watch = () =>
{
    const {epID} = useParams()

    const link = 'watch/'+epID
    const list = useFetch(link)
    const ep = list?.sources.find(obj=>obj.quality.includes('1080'))

    const cadena = epID.length
    const currentEp = epID.charAt(cadena-1)
    const nextEp = Number(currentEp)+1
    const next = epID.replace(epID.substring(cadena-1),nextEp)

    const download = () => 
    {
        window.location.href = list.download
    }

    return (
        <main>
            <Search/>
            <div className='caption'>
                <h3>{epID.toUpperCase()}</h3>
            </div>
                
            <div className='videoBox'>
                <ReactPlayer 
                className = 'video'
                url={ep?.url}
                playing
                controls
                width={720}
                height={480}
                ></ReactPlayer>
            </div>
            <div className='underVid'>
                <button>anime info</button>
                <button onClick={download}>download episode</button>
                <button onClick={()=>window.location.replace('/watch/'+next)}>next episode</button>
            </div>
        </main>
    )
}

export default Watch