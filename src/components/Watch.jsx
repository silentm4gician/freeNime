import { useNavigate, useParams } from 'react-router-dom'
import useEpisode from '../hooks/useEpisode'
import ReactPlayer from 'react-player'
import Loading from './Loading'
import useLoad from '../hooks/useLoad'
import { Alert, Button, ButtonGroup, Card, Container, DropdownButton, DropdownItem } from 'react-bootstrap'

const Watch = () =>
{
    const {epID} = useParams()
    const episode = useEpisode(epID)
    const loading = useLoad()
    const navigate = useNavigate()

    const prev =()=>
    {
        navigate('/watch/'+episode.prev)
        window.location.reload()
    }
    const info =()=>
    {
        navigate('/info/'+localStorage.getItem('watching'))
    }
    const download =()=>
    {
        window.location.href = episode.download
    }
    const next =()=>
    {
        navigate('/watch/'+episode.next)
        window.location.reload()
    }

    function verify()
    {
        window.onpopstate = function()
        {
            location.reload()
        }
    }
    
    return (
        <Container style={{maxWidth:'1000px'}}>
            {verify()}
            {console.log(episode.prev)}
            {console.log(episode.next)}
        {loading && <Loading/>}
            <br />
            <Card className='mt-5 text-center' bg='dark' text='light'>
                <Card.Header>{epID.toUpperCase()}</Card.Header>
                <Card.Body className=''>
                    <ReactPlayer 
                    className = 'video'
                    url={episode.ep?.url}
                    playing
                    controls={true}
                    volume={0.25}
                    pip
                    width={'100%'}
                    ></ReactPlayer>
                </Card.Body>
                <Card.Footer className=''>
                    <ButtonGroup>
                        <Button variant='light' style={episode.prev.includes('0' && episode.next.includes('2'))?{display:'none'}:null} onClick={prev}>Previous</Button>
                        <DropdownButton variant='light' as={ButtonGroup} title='More' id="bg-nested-dropdown" className='rounded'>
                            <DropdownItem onClick={info} eventKey='1'>Anime Info</DropdownItem>
                            <DropdownItem onClick={download} eventKey='2'>Download Episode</DropdownItem>
                        </DropdownButton>
                        <Button variant='light' style={episode.next.includes(episode.episodes + 1)?{display:'none'}:null} onClick={next}>Next</Button>
                    </ButtonGroup>
                </Card.Footer>
            </Card>
            <br />
            <Container className='d-flex justify-content-center'>
                <Alert variant='info' className='text-center' style={{width:'320px'}}>
                video quality will automatically improve
                </Alert>
            </Container>
        </Container>
    )
}

export default Watch