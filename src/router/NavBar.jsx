import { useContext } from "react"
import Context from "../context/Context"
import { Container, Navbar, Nav, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const NavBar = () =>
{
  
  const {setSearch, search} = useContext(Context)
  const navigate = useNavigate()

  const find =(e)=>
    {
        e.preventDefault()
        navigate('/results/'+search)
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
        />  freeNime </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/top">Top Airing</Nav.Link>
            <Nav.Link href="/movies">Movies</Nav.Link>
            <Nav.Link href="/genres">Genres</Nav.Link>
          </Nav>
          <Form onSubmit={find} className="d-flex">
            <Form.Control
              type="search"
              placeholder="search"
              className="m-1"
              aria-label="Search"
              required
              onChange={(e)=>setSearch(e.target.value)}
            />
            <Button type="submit" variant="light" className="m-1 d-flex rounded-pill"><img width={'18px'} src="/search.png" alt="search" className="mx-2 mt-1"/></Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar