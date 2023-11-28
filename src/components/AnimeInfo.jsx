import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Loading from './Loading'
import useLoad from '../hooks/useLoad'
import { Button, Card, Container } from 'react-bootstrap'
import { useContext } from 'react'
import Context from '../context/Context'

const AnimeInfo = () => 
{
  const {id} = useParams()
  const anime = useFetch('anime/gogoanime/info/'+id)
  const navigate = useNavigate()
  const loading = useLoad()
  const {endIndex,setEndIndex} = useContext(Context)
  const cut = anime?.episodes.slice(0,endIndex)
  
  return (
    <Container className='mt-2' style={{maxWidth:'750px'}}>
      {loading && <Loading/>}
        <br />
        <Card text='light' className='p-2 mt-5 text-center' bg='dark' border="dark">
          <Card.Header>{anime?.type} - {anime?.status} - {anime?.totalEpisodes} Episodes </Card.Header>
            <Card.Body>
              <Card.Title className='p-1'>{anime?.title}</Card.Title>
              <Card.Img style={{maxWidth:'400px'}} src={anime?.image} alt={anime?.title}/>
              <Card.Subtitle>{anime?.genres.map(genre=><p className='m-1' key={genre}>- {genre} -</p>)}</Card.Subtitle>
              <Card.Text className='p-3'>{anime?.description}</Card.Text>
            </Card.Body>
          <Card.Footer>Released in {anime?.releaseDate}</Card.Footer>
        </Card>
        <Card text='light' className='text-center bg-dark mt-2' bg='dark'>
          <Card.Header className='mb-0'>Episodes</Card.Header>
            <Container className='p-4'>
              {cut?.map(ep=>
              <Button key={ep.id} className='m-1 text-center px-3 btnEP' style={{minWidth:'70px'}} onClick={()=>navigate('/watch/'+ep.id)}>{ep.number}
              </Button>)}
              <Button variant='info' className='m-2' style={anime?.totalEpisodes < endIndex?{display:'none'}:null} onClick={()=>setEndIndex(endIndex+100)}>show more</Button>
            </Container>
        </Card>
    </Container>
  )
}

export default AnimeInfo