import { useContext } from "react"
import Context from "../context/Context"
import { Container, Navbar, Nav, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const NavBar = () => {

  const { setSearch, search } = useContext(Context)
  const navigate = useNavigate()

  const find = (e) => {
    e.preventDefault()
    navigate(`/results/${search}`)
    window.location.reload()
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="md" className="fixed-top">
      <Container>
        <Navbar.Brand href="/" className="navB">
          <img
            src='/FNLogo.png'
            alt="logo"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />◢ <span className="text-purple-300">free</span>Nime ◤</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">
              <span className="hover:text-purple-300">home</span>
            </Nav.Link>
            <Nav.Link href="/top">
              <span className="hover:text-purple-300">top airing</span></Nav.Link>
            <Nav.Link href="/movies">
              <span className="hover:text-purple-300">movies</span></Nav.Link>
            <Nav.Link href="/genres">
              <span className="hover:text-purple-300">genres</span></Nav.Link>
          </Nav>
          <Form onSubmit={find} className="d-flex">
            <Form.Control
              type="search"
              placeholder="search"
              className="m-1"
              aria-label="Search"
              required
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="rounded-lg bg-purple-300 p-2 my-1 transition duration-100 hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-5">
                <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
              </svg>
            </button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar