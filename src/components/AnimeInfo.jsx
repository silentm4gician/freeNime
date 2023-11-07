import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Loading from './Loading'
import useLoad from '../hooks/useLoad'
import { Button, Card, Container, ListGroup } from 'react-bootstrap'

const AnimeInfo = () => 
{
  const {id} = useParams()
  const anime = useFetch('info/'+id)
  const navigate = useNavigate()
  const loading = useLoad()

  return (
    <Container className='mt-2' style={{maxWidth:'750px'}}>
      {loading && <Loading/>}
        <br />
        <Card text='light' className='p-2 mt-5 text-center' bg='dark' border="dark">
          <Card.Header>{anime?.type} - {anime?.status} - {anime?.totalEpisodes} Episodes </Card.Header>
            <Card.Body>
              <Card.Title className='p-1'>{anime?.title}</Card.Title>
              <Card.Img style={{maxWidth:'400px'}} src={anime?.image} alt={anime?.title}/>
              <Card.Text className='p-3'>{anime?.description}</Card.Text>
            </Card.Body>
          <Card.Footer>Released in {anime?.releaseDate}</Card.Footer>
        </Card>
        <Card text='light' className='text-center bg-dark mt-2' bg='dark'>
          <Card.Header className='mb-0'>Episodes</Card.Header>
            <ListGroup className='p-5' variant='flush'>
              {anime?.episodes?.map(ep=>
                  <ListGroup.Item className='list-group-item-dark' key={ep.id}>
                    Episode {ep.number} - <Button variant='light' onClick={()=>navigate('/watch/'+ep.id)}>Watch</Button>
                  </ListGroup.Item>)}
            </ListGroup>
        </Card>
    </Container>
  )
}

export default AnimeInfo