import Link from "next/link"
import Image from "next/image"
import logo from "../public/logo.jpeg"



const NavBar = ({ account }) => {
    return (
        <div className="navbar">
            <div className="logo-wrapper">
                <Link href="/"><Image className="logo" src={logo} alt="Logo" width={150} height={100}/></Link>
            </div>
            <div className="account-info">
                <p>Welcome {account.username}</p>
                <img className="avatar" src={account.avatar.url}/>
            </div>
        </div>
    )
}

export default NavBar