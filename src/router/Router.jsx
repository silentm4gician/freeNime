import { Route, Routes } from "react-router-dom"
import App from "../App"
import AnimeInfo from "../components/AnimeInfo"
import NavBar from "./NavBar"
import Err from "../components/Err"
import Watch from "../components/Watch"
import Results from "../components/Results"
import Footer from "../components/Footer"
import Movies from "../components/Movies"
import TopAiring from "../components/TopAiring"
import Genres from "../components/Genres"
import Genre from "../components/Genre"

const Router = () => {
    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/top" element={<TopAiring/>}/>
                <Route path="/genres" element={<Genres/>}/>
                <Route path="/movies" element={<Movies/>}/>
                <Route path="/results/:search" element={<Results/>}/>
                <Route path="/info/:id" element={<AnimeInfo/>}/>
                <Route path="/watch/:epID" element={<Watch/>}/>
                <Route path="/genres/:genreID" element={<Genre/>}/>
                <Route path="/*" element={<Err></Err>}/>
            </Routes>
            <Footer/>
        </>
    )
}

export default Router