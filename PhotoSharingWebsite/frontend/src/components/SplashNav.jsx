import { Link } from "react-router-dom";
function SplashNav(){
    return(
        <nav className="splash-nav-bar">
            <Link id="splash_feature" to="#features" >Features</Link>
            <Link id="splash_discover" to="#discover">Discover</Link>
            <Link id="splash_community" to= "#community">Community</Link>
            <Link id="splash_about" to= "#about">About</Link>
           <div className="lognsign">
                <Link id="splash_login" to= "/login">Login</Link>
                <Link id="splash_signup" to= "/signup">SignUp</Link>
           </div>
        </nav>
    )
}

export default SplashNav;