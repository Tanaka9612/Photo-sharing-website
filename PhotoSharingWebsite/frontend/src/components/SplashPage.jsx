
import SplashNav from "./SplashNav";
import Login from "./Login";
import 'animate.css';

function SplashPage(){
    return(
        <div className="splashpage">
            <SplashNav/>
            <div className="splash-main-content">
                <div id="main-content-splash">
                    <div id="text">
                        <h1>Share your <span id="bluetext">vision</span></h1>
                        <h1>Inspire the world</h1>
                        <p>FrameFlow is where photographers and creators share moments, <br/> stories and perspectives that matter</p>
                        <div id="buttons">
                            <button id="join">Join FrameFlow</button>
                            <button id="explore">Explore Photos</button>
                        </div>
                    </div>
                    <div id="side-images">
                        <img className="animate__animated animate__fadeInDown" id="alyona" src="/frontend/src/assets/alyona-nagel.jpg" alt="alyona" srcset="" />
                        <img className="animate__animated animate__fadeInRight" id="pervane" src="/frontend/src/assets/pervane.jpg" alt="pervane" srcset="" />
                        <img className="animate__animated animate__fadeInUp" id="samert" src="/frontend/src/assets/samert.jpg" alt="samert" srcset="" />
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