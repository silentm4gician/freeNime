import { useNavigate, useParams } from 'react-router-dom'
import useEpisode from '../hooks/useEpisode'
import ReactPlayer from 'react-player'
import Loading from './Loading'
import { Alert, Button, ButtonGroup, Card, Container, DropdownButton, DropdownItem } from 'react-bootstrap'

const Watch = () =>
{
    const {epID} = useParams()
    const episode = useEpisode(epID)
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
        {episode.ep==undefined && <Loading/>}
            <br />
            <Card className='mt-5 text-center' bg='dark' text='light'>
                <Card.Header>{epID.toUpperCase()}</Card.Header>
                <Card.Body>
                    <ReactPlayer 
                    className = 'video'
                    url={episode.ep?.url}
                    playing
                    controls={true}
                    volume={0.70}
                    pip
                    width={'100%'}
                    height={'450px'}
                    ></ReactPlayer>
                </Card.Body>
                <Card.Footer className=''>
                    <ButtonGroup>
                        <Button variant='light' style={episode.prev.includes('episode-0')?{display:'none'}:null} onClick={prev}>Prev EP</Button>
                        <DropdownButton variant='light' as={ButtonGroup} title={<img width={'20px'} src='/list.png'></img>} id="bg-nested-dropdown" className='rounded'>
                            <DropdownItem onClick={info} eventKey='1'>Episode List</DropdownItem>
                            <DropdownItem onClick={download} eventKey='2'>Download Episode</DropdownItem>
                        </DropdownButton>
                        <Button variant='light' style={episode.next.includes(episode.episodes + 1)?{display:'none'}:null} onClick={next}>Next EP</Button>
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