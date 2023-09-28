import ep from '../mocks/watch.json'
const Watch = () =>
{
    const cap = ep.sources.find(obj=>obj.quality.includes('1080'))
    
    return (
        <div className='videoBox'>
            <video
            id='my-video'
            className='video-js'
            controls
            width='720'
            height='480'
            preload='auto'
            data-setup="{}"
            >
                <source src={cap.url}/>
            </video>
            <button onClick={()=>location.reload()}>refresh video player</button>
        </div>
    )
}

export default Watch