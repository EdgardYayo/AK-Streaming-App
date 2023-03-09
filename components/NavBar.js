import Link from "next/link"
import Image from "next/image"
import logo from "../public/960x0-1-768x512.jpg"



const NavBar = () => {
    return (
        <div className="navbar">
            <Link href="/"><Image src={logo} alt="Logo" width={90} height={50}/></Link>
        </div>
    )
}

export default NavBar