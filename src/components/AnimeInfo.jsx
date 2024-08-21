import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Loading from './Loading'
import { useContext } from 'react'
import Context from '../context/Context'
import CardData from './CardData'

const AnimeInfo = () => {
  const { id } = useParams()
  const anime = useFetch(`info/${id}`)
  const name = id.length > 15 ? id.slice(0, 10) : id
  const similar = useFetch(name)
  const similarResults = similar?.results.slice(1, 7)
  const navigate = useNavigate()
  const { endIndex, setEndIndex } = useContext(Context)
  const cut = anime?.episodes.slice(0, endIndex)
  const title = `${anime?.title} - freeNime`
  document.title = title
  
  const showMore = () => {
    anime?.totalEpisodes > 300
      ? setEndIndex(endIndex + 250)
      : setEndIndex(endIndex + 100)
  }

  return (
    // <Container className='mt-2' style={{maxWidth:'820px'}}>
    //   {anime==undefined && <Loading/>}
    //     <br />
    //     <Card text='light' className='p-2 mt-5 text-center' bg='dark' border="dark">
    //       <Card.Header>{anime?.type} - {anime?.status == 'Ongoing'
    //       ? <small style={{color:'lightgreen'}}>{anime?.status}</small>
    //       : <small style={{color:'red'}}>{anime?.status}</small>} - {anime?.totalEpisodes} Episodes </Card.Header>
    //         <Card.Body>
    //         <hr className='mx-5 mt-1 mb-2'/>
    //           <Card.Title className='p-1'>{anime?.title}</Card.Title>
    //         <hr className='mx-5 mt-2'/>
    //           <Card.Img style={{maxWidth:'330px', maxHeight:'500px'}} src={anime?.image} alt={anime?.title}/>
    //           <hr className='mx-5 mt-4'/>
    //           <Card.Text className='p-3'>{anime?.description}</Card.Text>
    //         </Card.Body>
    //         <hr className='mx-5 mt-1'/>
    //       <Card.Footer>Released in {anime?.releaseDate}</Card.Footer>
    //     </Card>
    //     <Card text='light' className='text-center bg-dark mt-2' style={{width:'100%'}} bg='dark'>
    //       <Card.Header className='mb-0'>Episodes</Card.Header>
    //         <Container className='p-4'>
    //           {cut?.map(ep=>
    //           <Button key={ep.id} className='m-1 text-center px-3 btnEP' style={{width:'70px'}} onClick={()=>navigate('/watch/'+ep.id)}>{ep.number}
    //           </Button>)}
    //           <Button variant='secondary' className='m-2' style={anime?.totalEpisodes < endIndex?{display:'none'}:null} onClick={showMore}>show more</Button>
    //         </Container>
    //     </Card>
    //     <Card text='light' className='text-center py-4 px-3 mt-2 related bg-dark' style={{width:'100%'}}>
    //       <Card.Header className='mb-2 mt-0'>Related</Card.Header>
    //       <Row xs={2} sm={4} md={4} lg={4} xl={4} className="g-3">
    //             {similarResults?.map(obj=><CardData key={obj.id} anime={obj} isRecent={false}/>)}
    //         </Row>
    //     </Card>
    // </Container>
    <>
      {anime == undefined && <Loading />}
      <div className='mt-20 text-white flex place-items-center container flex-col lg:flex-row'>
        <div className='shadow-2xl shadow-purple-300'>
          <img src={anime?.image} alt={anime?.id} className='rounded min-w-[250px] max-w-[300px] bg-purple-400 p-1 transition duration-200 hover:scale-105' />
        </div>
        <div className='mx-[5%] p-2 rounded shadow-md shadow-purple-300 border-2 border-purple-400 w-[75%] mt-4'>
          <h2 className='italic text-center bg-purple-400 rounded text-black p-1 shadow-2xl shadow-purple-300 mx-[10%]'>{anime?.title}</h2>
          <p className='font-semibold italic text-center'>{anime?.type} - <span style={anime?.status == 'Ongoing' ? { color: 'lightgreen' } : { color: 'red' }}>{anime?.status}</span></p>
          <p className='underline underline-offset-2 mx-2 text-xl font-semibold italic'>synopsis</p>
          <p className='mx-2 text-lg'>released in <span className='text-purple-400 italic font-semibold'>{anime?.releaseDate}</span>. {anime?.description}</p>
          <div className='mx-3'>
            <p className='underline underline-offset-2 text-xl font-semibold italic'>genres</p>
            <p className=''>{anime?.genres.map(genre => <span key={genre} onClick={() => {
              navigate(`/genres/${genre.toLowerCase().replace(/ /g, '-')}`)
            }} className='bg-purple-400 text-black p-1 mr-1 rounded font-semibold cursor-pointer transition duration-300 shadow-md hover:shadow-purple-300'> {genre} </span>)}</p>
          </div>
        </div>
      </div>
      <div className='flex container justify-center'>
        <div className='text-white text-center mt-8 border-2 border-purple-400 rounded shadow-xl shadow-purple-400 p-4 w-[75%]'>
          <p className='font-semibold text-lg'><span className='underline underline-offset-2 text-center mt-2 text-xl font-semibold italic'>episodes</span> ({anime?.totalEpisodes}) </p>
          {cut?.map(ep =>
            <button className='shadow-md p-2 bg-purple-400 rounded mx-[2px] text-black font-semibold w-12 my-1 transition duration-100 hover:scale-110 hover:shadow-purple-300' key={ep.id} onClick={() => {
              navigate(`/watch/${ep.id}`)
            }}>
              {ep.number}
            </button>)}
          <button onClick={showMore} style={anime?.totalEpisodes < endIndex ? { display: 'none' } : null} className='p-2 bg-purple-600 rounded mx-1 font-semibold italic'>show more</button>
        </div>
      </div>
      <div className='container flex justify-center' style={similarResults == 0 ? { display: 'none' } : null}>
        <div className='text-white text-center mt-4 border-2 border-purple-400 rounded shadow-xl shadow-purple-400 p-2 w-[80%]'>
          <p className='underline text-xl font-semibold italic text-center mt-2 underline-offset-2'>similar results</p>
          <div className='grid grid grid-cols-2 lg:grid-cols-6 md:grid-cols-3 gap-2 p-3'>
            {similarResults?.map(result => <CardData key={result.id} isRecent={false} anime={result} />)}
          </div>
        </div>
      </div>
    </>
  )
}

export default AnimeInfo