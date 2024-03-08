import { useParams } from "react-router-dom"
import Loading from "./Loading"
import CardData from "./CardData"
import { Container, Row } from "react-bootstrap"
import Pages from "./Pages"
import usePages from "../hooks/usePages"

const Results = () => 
{
    const {search} = useParams()
    const results = usePages(search+'?page=')

    return (
        <Container className="p-4">
            <hr className='mx-5 mt-5 hrs'/>
            <Container className="d-flex justify-content-center">
            <h3 className="mt-2 alerta">best results for "{search}"</h3>
            </Container>
            <hr className='mx-5 hrs'/>
            {results==undefined && <Loading/>}
            <Row xs={2} sm={2} md={3} lg={4} xl={5} className="g-3">
                {results?.results.map(obj=><CardData key={obj.id} anime={obj} isRecent={false}/>)}
            </Row>
            <Pages hasNext={results?.hasNextPage} page={results?.currentPage}/>
        </Container>
    )
}

export default Results