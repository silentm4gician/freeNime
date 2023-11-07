import useLoad from "../hooks/useLoad"
import Loading from "./Loading"

const Err = () => 
{
  const loading = useLoad()

  return (
    <>
      {loading && <Loading/>}
      <div className="mt-5 text-center pt-5 text-light">
        THIS PAGE DOESN'T EXIST
      </div>
    </>
  )
}

export default Err