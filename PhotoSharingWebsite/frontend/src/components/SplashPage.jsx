import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"
import SplashNav from "./SplashNav";

function SplashPage(){
    return(
        <div className="splashpage">
            <BrowserRouter>
                <SplashNav/>
                {/* <Routes>
                    <Route path="/" element={}/>
                </Routes> */}
            </BrowserRouter>
            <div className="splash-main-content">
                <div id="main-content-splash">
                    <div id="text">
                        <h1></h1>
                    </div>
                </div>
                <div id="features"></div>
                <div id="discover"></div>
                <div id="community"></div>
                <div id="about"></div>
            </div>

        </div>
    )
}

export default SplashPage;