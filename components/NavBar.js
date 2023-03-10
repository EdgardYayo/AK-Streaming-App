import Link from "next/link"
import Image from "next/image"
import logo from "../public/960x0-1-768x512.jpg"



const NavBar = ({ account }) => {
    return (
        <div className="navbar">
            <div className="logo-wrapper">
                <Link href="/"><Image src={logo} alt="Logo" width={90} height={50}/></Link>
            </div>
            <div className="account-info">
                <p>Welcome {account.username}</p>
                <img className="avatar" src={account.avatar.url}/>
            </div>
        </div>
    )
}

export default NavBar