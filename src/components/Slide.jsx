import { useEffect, useState } from "react"
import usePages from "../hooks/usePages"
import { useNavigate } from "react-router-dom"
import Loading from "./Loading"

const Slide = () => {
  const navigate = useNavigate()
  const slides = usePages('top-airing?page=')
  const [index, setIndex] = useState(0)

  const prevSlide = () => {
    const isFirstSlide = index === 0;
    const newIndex = isFirstSlide ? slides?.results.length - 1 : index - 1;
    setIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = index === slides?.results.length - 1;
    const newIndex = isLastSlide ? 0 : index + 1;
    setIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setIndex(slideIndex);
  };

  const goToAnime = () => {
    localStorage.removeItem('watching')
    localStorage.setItem('watching', slides?.results[index].id)
    navigate(`/info/${slides?.results[index].id}`)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 3800)
    return () => clearInterval(interval)
  }, [index]);

  return (
    <>
      {slides == undefined && <Loading />}
      <div className="mb-8">
        <div className='max-w-[850px] h-[400px] w-full m-auto py-2 px-4 relative group'>
          <div
            style={{ backgroundImage: `url(${slides?.results[index].image})` }}
            className='w-full h-full rounded-xl bg-center bg-cover duration-500 cursor-pointer shadow-2xl shadow-purple-300'
            onClick={goToAnime}
          ></div>
          <div className="absolute top-[70%] translate-x-[2%] w-[80%]">
            <p className='absolute font-bold rounded p-1 shadow-md shadow-purple-300 bg-purple-300'>{slides?.results[index].title}</p>
          </div>
          <div className='group-hover:block absolute top-[50%] -translate-x-[-7px] translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:scale-110 duration-200 shadow-md hover:shadow-purple-300' onClick={prevSlide}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
            </svg>
          </div>
          <div className='group-hover:block absolute top-[50%] -translate-x-2 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:scale-110 duration-200 shadow-md hover:shadow-purple-300' onClick={nextSlide}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
            </svg>
          </div>
          <div className='flex top-4 justify-center py-2'>
            {slides?.results.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className='text-2xl cursor-pointer text-purple-300'
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 py-[1px] hover:scale-110 shadow-md hover:shadow-purple-300 rounded-lg" style={slideIndex == index ? { backgroundColor: 'violet' } : null}>
                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM6.5 5.5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-3Z" clipRule="evenodd" />
                </svg>

              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Slide