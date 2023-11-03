import { Button, Card, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const CardData = ({anime, isRecent}) =>
{
    const navigate = useNavigate()
    
    const watch =(e)=>
    {
        localStorage.removeItem('watching')
        localStorage.setItem('watching',e.target.value)
        navigate("/watch/"+anime.episodeId)
    }

    const info =(e)=>
    {
        localStorage.removeItem('watching')
        localStorage.setItem('watching',e.target.value)
        navigate("/info/"+anime.id)
    }

    return (
        <>
        {
            isRecent
                ?
                    <Col>
                        <Card bg='dark' className='h-100 p-2' border="dark" style={{minWidth:'110px'}}>
                            <Card.Img width={'100px'} src={anime.image} alt={anime.title}/>
                            <Card.ImgOverlay>
                                <Button value={anime.id} onClick={watch} variant='warning'>Episode {anime.episodeNumber}</Button>
                            </Card.ImgOverlay>
                            <Card.Footer>
                                <Card.Title className='text-center text-truncate text-light'>{anime.title}</Card.Title>
                            </Card.Footer>
                        </Card>
                    </Col>
                :

                    <Col>
                        <Card bg='dark' className='h-100 p-2' border="dark" style={{minWidth:'110px'}}>
                            <Card.Img width={'100px'} src={anime.image} alt={anime.title}/>
                            <Card.ImgOverlay><Button value={anime.id} onClick={info} variant='warning'>More Info</Button></Card.ImgOverlay>
                            <Card.Footer>
                                <Card.Title className='text-center text-white'>{anime.title}</Card.Title>
                                <Card.Text className='text-white'>
                                    {anime.releaseDate} - {anime.subOrDub}
                                </Card.Text>
                            </Card.Footer>
                        </Card>
                    </Col>
        }
    </>
    )
}

export default CardData