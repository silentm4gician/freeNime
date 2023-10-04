import { Route, Routes } from "react-router-dom"
import App from "../App"
import AnimeInfo from "../components/AnimeInfo"
import NavBar from "./NavBar"
import Err from "../components/Err"
import Watch from "../components/Watch"
import Results from "../components/Results"
import Footer from "../components/Footer"

const Router = () => {
    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/results/:search" element={<Results/>}/>
                <Route path="/info/:id" element={<AnimeInfo/>}/>
                <Route path="/watch/:epID" element={<Watch/>}/>
                <Route path="*" element={<Err></Err>}/>
            </Routes>
            <Footer/>
        </>
    )
}

export default Router