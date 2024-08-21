import { Link, useNavigate, useParams } from 'react-router-dom'
import useEpisode from '../hooks/useEpisode'
import ReactPlayer from 'react-player'
import Loading from './Loading'

const Watch = () => {
    const watching = localStorage.getItem('watching')
    const { epID } = useParams()
    const episode = useEpisode(epID, watching)
    const navigate = useNavigate()
    const title = `${episode?.title} - freeNime`
    document.title = title

    const prev = () => {
        navigate(`/watch/${episode.prev}`)
        window.location.reload()
    }
    const info = () => {
        navigate(`/info/${watching}`)
    }
    const next = () => {
        navigate(`/watch/${episode.next}`)
        window.location.reload()
    }

    return (
        <>
            {episode.ep == undefined && <Loading />}
            <div className='mt-24'>
                <h4 className='italic bg-purple-400 p-2 rounded text-center mx-[10%] lg:mx-[30%] shadow-md shadow-purple-300'>{episode?.title}</h4>
                <div className='mt-6 shadow-xl shadow-purple-300 p-1 mx-[5%] lg:mx-[25%] rounded max-h-min bg-black'>
                    <ReactPlayer
                        url={episode.ep?.url}
                        playing
                        controls={true}
                        volume={0.70}
                        pip
                        width={'100%'}
                        height={'100%'}
                    ></ReactPlayer>
                </div>
                <div className='mt-4 flex justify-between mx-[26%]'>
                    <div>
                        <Link className='text-black' to={episode?.download} target='_blank'>
                            <button className='mr-1 transition duration-100 hover:scale-110'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-8 bg-purple-400 rounded p-1">
                                    <path fillRule="evenodd" d="M4.5 13a3.5 3.5 0 0 1-1.41-6.705A3.5 3.5 0 0 1 9.72 4.124a2.5 2.5 0 0 1 3.197 3.018A3.001 3.001 0 0 1 12 13H4.5Zm6.28-3.97a.75.75 0 1 0-1.06-1.06l-.97.97V6.25a.75.75 0 0 0-1.5 0v2.69l-.97-.97a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l2.25-2.25Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </Link>
                        <Link to={`/info/${watching}`} className='text-black'>
                            <button className='transition duration-100 hover:scale-110' onClick={info}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-8 bg-purple-400 rounded p-1">
                                    <path d="M3 4.75a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6.25 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 7.25a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 11.5a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM4 12.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM3 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                    <div>
                        <Link className='text-black' to={`/watch/${episode.prev}`} style={episode.prev.includes('episode-0') ? { display: 'none' } : null} onClick={prev}>
                            <button className='mr-1 transition duration-100 hover:scale-110'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-8 bg-purple-400 rounded p-1">
                                    <path fillRule="evenodd" d="M14 8a.75.75 0 0 1-.75.75H4.56l1.22 1.22a.75.75 0 1 1-1.06 1.06l-2.5-2.5a.75.75 0 0 1 0-1.06l2.5-2.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </Link>
                        <Link to={`/watch/${episode.next}`} style={episode.next.includes(episode.episodes + 1) ? { display: 'none' } : null} onClick={next} className='text-black'>
                            <button className='transition duration-100 hover:scale-110'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-8 bg-purple-400 rounded p-1">
                                    <path fillRule="evenodd" d="M2 8c0 .414.336.75.75.75h8.69l-1.22 1.22a.75.75 0 1 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 0-1.06l-2.5-2.5a.75.75 0 1 0-1.06 1.06l1.22 1.22H2.75A.75.75 0 0 0 2 8Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className='mt-10'>
                    <p className='bg-purple-400 rounded p-3 mx-[30%] text-center italic font-bold shadow-lg shadow-purple-300'>video quality automatically improves</p>
                </div>
            </div>
        </>
    )
}

export default Watch