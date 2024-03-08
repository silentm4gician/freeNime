import { useId } from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const CardData = ({anime, isRecent}) =>
{
    const navigate = useNavigate()
    const ID = useId()
    
    const watch =()=>
    {

        const target = document.getElementById(ID)
        
        localStorage.removeItem('watching')
        localStorage.setItem('watching',target.childNodes[1].childNodes[0].value)
        navigate("/watch/"+anime.episodeId)
    }

    const info =()=>
    {
        const target = document.getElementById(ID)

        localStorage.removeItem('watching')
        localStorage.setItem('watching',target.childNodes[1].childNodes[0].value)
        navigate("/info/"+anime.id)
        window.location.reload()
    }

    return (
        <>
        {
            isRecent
                ?
                    <Col>
                        <Card id={ID} onClick={watch} bg='dark' className='h-100 p-2 cards rare-wind-gradient' border="dark" style={{minWidth:'110px'}}>
                            <Card.Img width={'100px'} src={anime.image} alt={anime.title}/>
                            <Card.ImgOverlay>
                                <Button className='epNumber' value={anime.id} variant='warning'>{anime.episodeNumber}</Button>
                            </Card.ImgOverlay>
                            <Card.Footer>
                                <Card.Title className='text-center fs-6 text-truncate text-light'>{anime.title}</Card.Title>
                            </Card.Footer>
                        </Card>
                    </Col>
                :

                    <Col>
                        <Card id={ID} onClick={info} bg='dark' className='cards h-100 p-2' border="dark" style={{minWidth:'110px'}}>
                            <Card.Img width={'100px'} src={anime.image} alt={anime.title}/>
                            <Card.ImgOverlay><Button className='epNumber' value={anime.id} variant='warning'>{anime.subOrDub || anime.released || anime.releaseDate || 'TOP'}</Button></Card.ImgOverlay>
                            <Card.Footer>
                                <Card.Title className='text-center fs-6 text-truncate text-white '>{anime.title}</Card.Title>
                                <Card.Text className='text-white text-center'>
                                    {anime.releaseDate}
                                </Card.Text>
                            </Card.Footer>
                        </Card>
                    </Col>
        }
    </>
    )
}

export default CardData