import { Link } from "react-router-dom"

const NavBar = () =>
{
  return (
    <header className="navBox">
      <div className="nav">
        <Link to={'/'}>HOME</Link>
        <Link to={'https://www.paypal.com/donate/?hosted_button_id=LDLVEZSUYSDSJ'}>DONATE</Link>
      </div>
    </header>
  )
}

export default NavBar