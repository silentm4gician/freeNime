import { Image, Spinner } from 'react-bootstrap'
const Loading = () =>
{
    return (
        <>
        <div className="loading-screen">
                <Image className='mx-3' style={{maxWidth:'60px'}} src='/FNLogo.png' alt='logo'/>
                <Spinner animation="grow" className='text-purple-300' />
                <Image className='mx-3' style={{maxWidth:'60px'}} src='/FNLogo.png' alt='logo'/>
        </div>
        </>
    )
}

export default Loading