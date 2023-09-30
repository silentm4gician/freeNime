import { Link } from "react-router-dom"

const NavBar = () =>
{
  return (
    <header className="navBox">
      <div className="nav">
        <Link to={'/'}>HOME</Link>
        <Link to={''}>NEWS</Link>
        <Link to={''}>PROFILE</Link>
      </div>
    </header>
  )
}

export default NavBar