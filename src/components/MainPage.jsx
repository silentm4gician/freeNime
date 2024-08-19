import Loading from "./Loading"
import CardData from "./CardData"
import Pages from "./Pages"
import usePages from "../hooks/usePages"

const MainPage = () => {
    const data = usePages('recent-episodes?page=')

    return (
        <>
            <section className="">
                <div className="mt-20 mb-4">
                    <h3 className="text-3xl italic bg-purple-400 p-2 rounded max-w-60 text-center shadow-md shadow-purple-300 text-black">recent episodes</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {data === undefined
                        ? <Loading />
                        : data?.results.map(anime => <CardData key={anime.id} anime={anime} isRecent={true} />)
                    }
                </div>
            </section>
            <Pages hasNext={data?.hasNextPage} page={data?.currentPage}/>
        </>
    )
}

export default MainPage