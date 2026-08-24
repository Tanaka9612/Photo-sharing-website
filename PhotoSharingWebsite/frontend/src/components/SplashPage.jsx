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
                        <h1>Share your vision</h1>
                        <h1>Inspire the world</h1>
                        <p>FrameFlow is where photographers and creators share moments, stories and perspectives that matter</p>
                        <div id="buttons">
                            <button>Join FrameFlow</button>
                            <button>Explore Photos</button>
                        </div>
                    </div>
                    <div id="side-images">
                        
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