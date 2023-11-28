import useFetch from "../hooks/useFetch"
import { useParams } from "react-router-dom"
import useLoad from "../hooks/useLoad"
import Loading from "./Loading"
import CardData from "./CardData"
import { Alert, Container, Row } from "react-bootstrap"

const Results = () => 
{
    const {search} = useParams()
    const prefix = 'anime/gogoanime/'
    const results = useFetch(prefix+search)
    const loading = useLoad()

    return (
        <Container className="p-4">
            <Container className="d-flex justify-content-center">
                <Alert variant='dark' className='alerta text-center mt-5' style={{width:'400px'}}>
                        Results for "{search}"
                </Alert>
            </Container>
            {loading && <Loading/>}
            <Row xs={2} sm={2} md={3} lg={4} xl={5} className="g-3">
                {results?.results.map(obj=><CardData key={obj.id} anime={obj} isRecent={false}/>)}
            </Row>
        </Container>
    )
}

export default Results