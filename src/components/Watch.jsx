import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import ReactPlayer from 'react-player'

const Watch = () =>
{
    const {epID} = useParams()
    const link = '/watch/'+epID
    const list = useFetch(link)
    const cap = list?.sources.find(obj=>obj.quality.includes('1080'))

    return (
        <main>
            <div className='videoBox'>
                <ReactPlayer 
                className = 'video'
                url={cap?.url}
                playing
                controls
                width={720}
                height={480}
                ></ReactPlayer>
            </div>
        </main>
    )
}

export default Watch