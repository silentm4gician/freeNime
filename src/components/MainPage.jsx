import Card from "./Card"
import useFetch from "../hooks/useFetch"

const MainPage = () => 
{
    const link = '/recent-episodes'
    const list = useFetch(link)

    return (
        <main>
            <h2>RECENT EPISODES</h2>
            <div className="box">
                {list?.results.map(obj=><Card className='card' key={obj.id} anime={obj} isRecent={true}/>)}
            </div>
        </main>
    )
}

export default MainPage