import { Route, Routes } from "react-router-dom"
import App from "../App"
import AnimeInfo from "../components/AnimeInfo"
import NavBar from "./NavBar"
import Err from "../components/Err"
import Watch from "../components/Watch"

const Router = () => {
    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/" element={<App/>}></Route>
                <Route path="/info" element={<AnimeInfo/>}/>
                <Route path="/watch" element={<Watch/>}/>
                <Route path="*" element={<Err></Err>}/>
            </Routes>
        </>
    )
}

export default Router