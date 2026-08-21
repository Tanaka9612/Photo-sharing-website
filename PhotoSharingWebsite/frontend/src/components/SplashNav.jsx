import { Link } from "react-router-dom";
function SplashNav(){
    return(
        <nav className="splash-nav-bar">
            <Link to="#features" >Features</Link>
            <Link to="#discover">Discover</Link>
            <Link to= "#community">Community</Link>
            <Link to= "#about">About</Link>
            <Link to= "/login">Login</Link>
            <Link to= "/signup">SignUp</Link>
        </nav>
    )
}

export default SplashNav;