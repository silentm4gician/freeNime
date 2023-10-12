import { useParams } from 'react-router-dom'
import useEpisode from '../hooks/useEpisode'
import ReactPlayer from 'react-player'
import Search from './Search'
import Loading from './Loading'
import useLoad from '../hooks/useLoad'

const Watch = () =>
{
    const {epID} = useParams()
    const episode = useEpisode(epID)
    const loading = useLoad()

    const prev =()=>
    {
        window.location.replace('/watch/'+episode.prev)
    }
    const info =()=>
    {
        window.location.replace('/info/'+localStorage.getItem('watching'))
    }
    const download =()=>
    {
        window.location.href = list.download
    }
    const next =()=>
    {
        window.location.replace('/watch/'+episode.next)
    }
    
    return (
        <>
        {loading && <Loading/>}
        <main>
            <Search/>
            <div className='caption'>
                <h3>{epID.toUpperCase()}</h3>
            </div>
            <div className='videoBox'>
                <ReactPlayer 
                className = 'video'
                url={episode.ep?.url}
                playing
                controls={true}
                volume={0.25}
                pip
                width={1080}
                height={500}
                style={{borderRadius:'20px'}}
                ></ReactPlayer>
            </div>
        </main>
            <div className='underVid'>
                <div className='underVidButtons'>
                <button style={episode.prev.includes('0')?{display:'none'}:null} onClick={prev}>⬅️ previous</button>
                <button onClick={info}>info</button>
                <button onClick={download}>download</button>
                <button style={episode.next.includes(episode.episodes + 1)?{display:'none'}:null} onClick={next}>next ➡️</button>
                </div>
            </div>
        </>
    )
}

export default Watch