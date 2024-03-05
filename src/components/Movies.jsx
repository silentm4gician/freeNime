import { Container, Row } from "react-bootstrap"
import Loading from "./Loading"
import useFetch from "../hooks/useFetch"
import CardData from "./CardData"

const Movies = () => 
{
    const results = useFetch('movies')
    return (
        <Container className="p-4">
            <hr className='mx-5 mt-5 hrs'/>
            <Container className="d-flex justify-content-center">
            <h3 className="mt-2 alerta">latest movies</h3>
            </Container>
            <hr className='mx-5 hrs'/>
            {results==undefined && <Loading/>}
            <Row xs={2} sm={2} md={3} lg={4} xl={5} className="g-3">
                {results?.results.map(obj=><CardData key={obj.id} anime={obj} isRecent/>)}
            </Row>
        </Container>
    )
}

export default Movies