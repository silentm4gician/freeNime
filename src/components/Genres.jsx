import useFetch from "../hooks/useFetch"
import Loading from "./Loading"
import { useNavigate } from "react-router-dom"

const Genres = () => {
    const list = useFetch('genre/list')
    const navigate = useNavigate()
    const title = `genre list - freeNime`
    document.title = title

    return (
        <>
            {list == undefined && <Loading />}
            <div className="container mt-20">
                <h3 className="text-3xl italic bg-purple-400 p-2 rounded max-w-60 text-center shadow-md shadow-purple-300 text-black">genre list</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                    {list?.map(genre =>
                        <button key={genre.id} className="p-2 m-1 bg-purple-400 rounded shadow-md transition duration-200 hover:scale-105 hover:shadow-purple-300 font-semibold italic" onClick={() => navigate(`${genre.id}`)}>
                            {genre.title}
                        </button>)}
                </div>
            </div>
        </>
    )
}

export default Genres