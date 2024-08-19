import { useNavigate } from "react-router-dom"

const Pages = ({ hasNext, page }) => {
    const navigate = useNavigate()

    const nextPage = () => {
        localStorage.setItem('page', +page + 1)
        navigate(`?page=${localStorage.getItem('page')}`)
        window.location.reload()
    }

    const prevPage = () => {
        localStorage.setItem('page', +page - 1)
        navigate(`?page=${localStorage.getItem('page')}`)
        window.location.reload()
    }

    return (
        <div className="mt-4 flex justify-center mx-[26%] ">
            <button style={page != 1 ? null : { display: 'none' }} className='mr-1 transition duration-100 hover:scale-110 text-black' onClick={prevPage}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-8 bg-purple-400 rounded p-1">
                    <path fillRule="evenodd" d="M14 8a.75.75 0 0 1-.75.75H4.56l1.22 1.22a.75.75 0 1 1-1.06 1.06l-2.5-2.5a.75.75 0 0 1 0-1.06l2.5-2.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z" clipRule="evenodd" />
                </svg>
            </button>
            <p className="text-white italic font-bold p-1 mr-1 mt-3">- {page} -</p>
            <button style={hasNext ? null : { display: 'none' }} className='transition duration-100 hover:scale-110 text-black' onClick={nextPage}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-8 bg-purple-400 rounded p-1">
                    <path fillRule="evenodd" d="M2 8c0 .414.336.75.75.75h8.69l-1.22 1.22a.75.75 0 1 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 0-1.06l-2.5-2.5a.75.75 0 1 0-1.06 1.06l1.22 1.22H2.75A.75.75 0 0 0 2 8Z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    )
}

export default Pages