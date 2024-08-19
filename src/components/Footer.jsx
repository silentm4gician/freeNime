
const Footer = () => {
    return (
        <footer className="text-center mb-4 mt-4 text-white hover:text-purple-300 font-semibold">
            <div className="flex flex-col place-items-center mb-1">
                <img src="/dmg.png" alt="dmg" className='w-80' />
                <div className=" rounded-xl bg-purple-400 min-w-60 p-1 shadow-xl shadow-purple-300 italic transition duration-200 hover:scale-105"><a className="contact" style={{ textDecoration: 'none', color: 'black' }} href="https://silentm4gician.netlify.app/" target="_blank"> silentM4gician </a></div>
            </div>
            <a className="contact" href="https://www.paypal.com/donate/?hosted_button_id=LDLVEZSUYSDSJ" style={{ textDecoration: 'none', color: 'white' }} target="_blank"> donate </a>
            |
            <a className="contact" style={{ textDecoration: 'none', color: 'white' }} href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=leandroGonzalezMat@gmail.com" target="_blank" > contact </a>
            |
            ©2023
        </footer>
    )
}

export default Footer