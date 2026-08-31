import { Link } from "react-router-dom";
import "animate.css";

import { Lineicons } from "@lineiconshq/react-lineicons";
import {CloudDownloadBulk, EmojiSadOutlined } from "@lineiconshq/free-icons";

function NotFound() {
    return (
        <div className="notfound">
            <h1>404 Page Not Found</h1>

            {/* <Lineicons icon={CloudDownloadBulk} size={50} color="gray"/> */}

            <div className="">
                Return Home{" "} <br/>
                <Lineicons className="animate__animated animate__heartBeat" icon={EmojiSadOutlined} color="black" size={100}/>
                <div className="animate__animated animate__heartBeat animate__infinite">
                    <Link to="/home">Home</Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;