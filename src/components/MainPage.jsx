import useFetch from "../hooks/useFetch"
import useLoad from '../hooks/useLoad'
import Loading from "./Loading"
import CardData from "./CardData"
import { Alert, Container, Row } from "react-bootstrap"

const MainPage = () => 
{

    const loading = useLoad()
    const link = 'anime/gogoanime/recent-episodes'
    const list = useFetch(link)

    return (
        <Container className="p-4">
            <Container className="d-flex justify-content-center">
                <Alert variant='dark' className='alerta text-center mt-5' style={{width:'600px'}}>Recently Added Episodes
                </Alert>
                <hr style={{color:'white',maxWidth:'500px'}}/>
            </Container>

            {loading && <Loading/>}
            <Row xs={2} sm={2} md={3} lg={4} xl={5} className="g-3">
                {list?.results.map(obj=><CardData key={obj.id} anime={obj} isRecent={true}/>)}
            </Row>
        </Container>
    )
}

export default MainPage