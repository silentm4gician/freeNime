import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Loading from './Loading'
import { Button, Card, Container } from 'react-bootstrap'
import { useContext } from 'react'
import Context from '../context/Context'

const AnimeInfo = () => 
{
  const {id} = useParams()
  const anime = useFetch('anime/gogoanime/info/'+id)
  const navigate = useNavigate()
  const {endIndex,setEndIndex} = useContext(Context)
  const cut = anime?.episodes.slice(0,endIndex)
  
  return (
    <Container className='mt-2' style={{maxWidth:'820px'}}>
      {anime==undefined && <Loading/>}
        <br />
        <Card text='light' className='p-2 mt-5 text-center' bg='dark' border="dark">
          <Card.Header>{anime?.type} - {anime?.status == 'Ongoing'
          ? <small style={{color:'lightgreen'}}>{anime?.status}</small>
          : <small style={{color:'red'}}>{anime?.status}</small>} - {anime?.totalEpisodes} Episodes </Card.Header>
            <Card.Body>
            <hr className='mx-5 mt-1 mb-2'/>
              <Card.Title className='p-1'>{anime?.title}</Card.Title>
            <hr className='mx-5 mt-2'/>
              <Card.Img style={{maxWidth:'330px', maxHeight:'500px'}} src={anime?.image} alt={anime?.title}/>
              <hr className='mx-5 mt-4'/>
              <Card.Text className='p-3'>{anime?.description}</Card.Text>
            </Card.Body>
            <hr className='mx-5 mt-1'/>
          <Card.Footer>Released in {anime?.releaseDate}</Card.Footer>
        </Card>
        <Card text='light' className='text-center bg-dark mt-2' style={{width:'100%'}} bg='dark'>
          <Card.Header className='mb-0'>Episodes</Card.Header>
            <Container className='p-4'>
              {cut?.map(ep=>
              <Button key={ep.id} className='m-1 text-center px-3 btnEP' style={{width:'70px'}} onClick={()=>navigate('/watch/'+ep.id)}>{ep.number}
              </Button>)}
              <Button variant='secondary' className='m-2' style={anime?.totalEpisodes < endIndex?{display:'none'}:null} onClick={()=>setEndIndex(endIndex+100)}>show more</Button>
            </Container>
        </Card>
    </Container>
  )
}

export default AnimeInfo