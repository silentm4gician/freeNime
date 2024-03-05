
const Footer = () => {
    return (
        <footer className="footerL">
            <div className="d-flex justify-content-center">
                <hr style={{width:'40%'}}/>
            </div>
            <a className="contact" style={{textDecoration:'none',color:'white'}} href="https://www.paypal.com/donate/?hosted_button_id=LDLVEZSUYSDSJ" target="_blank"> donate </a>
            |
            <a className="contact" style={{textDecoration:'none',color:'white'}} href="https://github.com/silentm4gician" target="_blank"> silentM4gician </a>
            | 
            <a className="contact" style={{textDecoration:'none',color:'white'}}href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=leandroGonzalezMat@gmail.com" target="_blank" > contact </a>
            | ©2023
        </footer>
    )
}

export default Footer