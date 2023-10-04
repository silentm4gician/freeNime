import Card from "./Card"
import useFetch from "../hooks/useFetch"
import useLoad from '../hooks/useLoad'
import Loading from "./Loading"

const MainPage = () => 
{

    const loading = useLoad()
    const link = 'recent-episodes'
    const list = useFetch(link)

    return (
        <main>
            {loading && <Loading/>}
            <h2>RECENT EPISODES</h2>
            <div className="boxRecents">
                {list?.results.map(obj=><Card key={obj.id} anime={obj} isRecent={true}/>)}
            </div>
        </main>
    )
}

export default MainPage