import { Container, Row } from "react-bootstrap"
import useFetch from "../hooks/useFetch"
import Loading from "./Loading"

const Genres = () => 
{
    const list = useFetch('genre/list')
    return (
        <Container className="p-4">
            <hr className='mx-5 mt-5 hrs'/>
            <Container className="d-flex justify-content-center">
            <h3 className="mt-2 alerta">genre list</h3>
            </Container>
            <hr className='mx-5 hrs'/>
            {list == undefined && <Loading/>}
            <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-3">
            {list?.map(gen => 
            <div className="text-white" key={gen.id}>
                ● <a className="genres" href={`/genres/${gen.id}`}>{gen.title}</a>
            </div>)}
            </Row>
        </Container>
    )
}

export default Genres