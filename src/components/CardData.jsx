import { useNavigate } from 'react-router-dom'

const CardData = ({ anime, isRecent }) => {
    const navigate = useNavigate()

    const watch = () => {
        localStorage.removeItem('watching')
        localStorage.setItem('watching', anime.id)
        navigate(`watch/${anime.episodeId}`)
    }

    const info = () => {
        localStorage.removeItem('watching')
        localStorage.setItem('watching', anime.id)
        navigate(`/info/${anime.id}`)
        window.location.reload()
    }

    return (
        <>
            {
                isRecent
                    ?
                    <div className="max-w-md rounded-lg shadow-md shadow-purple-300 transition duration-200 hover:scale-105 relative isolate overflow-hidden rounded-xl px-8 pb-8 pt-40 hover:cursor-pointer" onClick={watch}>
                        <img className="rounded-lg absolute inset-0 h-full w-full object-cover" src={anime.image} alt={anime.title} />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20">
                            <p className='absolute font-bold text-white mt-[55%] mx-[5%]'>{anime.title}</p>
                            <h5 className='absolute font-bold text-black bg-purple-400 rounded-r p-1 italic'>{anime.episodeNumber}</h5>
                        </div>
                    </div>//

                    :

                    <div className="max-w-md rounded-lg shadow-md shadow-purple-300 transition duration-200 hover:scale-105 relative isolate overflow-hidden rounded-xl px-8 pb-8 pt-40 hover:cursor-pointer" onClick={info}>
                        <img className="rounded-lg absolute inset-0 h-full w-full object-cover" src={anime.image} alt={anime.title} />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20">
                            <p className='absolute font-bold text-white mt-[55%] mx-[5%]'>{anime.title}</p>
                            <h5 className='absolute font-bold text-black bg-purple-400 rounded-r p-1 italic'>{anime.subOrDub || anime.released || anime.releaseDate || 'TOP'}</h5>
                        </div>
                    </div>
            }
        </>
    )
}

export default CardData