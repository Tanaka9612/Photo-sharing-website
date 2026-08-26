import { Link } from "react-router-dom";
import "animate.css";

import { Lineicons } from "@lineiconshq/react-lineicons";
import { CloudBolt1Bulk } from "@lineiconshq/free-icons";

function NotFound() {
    return (
        <div className="notfound">
            <h1>404 Page Not Found</h1>

            {/* <Lineicons
                icon={CloudBolt1Bulk}
                size={50}
                color="blue"
            /> */}

            <div className="">
                Return Home{" "}
                <div className="animate__animated animate__heartBeat animate__infinite">
                    <Link to="/home">Home</Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;