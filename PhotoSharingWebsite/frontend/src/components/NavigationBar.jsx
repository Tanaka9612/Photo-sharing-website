import { Link } from "react-router-dom";
import { Lineicons } from "@lineiconshq/react-lineicons";
import {Bell1Outlined, Message2Stroke } from "@lineiconshq/free-icons"
function NavigationBar(){
    return (
        <nav className="nav-bar">
            <Link>Home</Link>
            <Link>Discover</Link>
            <Link>Following</Link>
            <div className="form-div">
                <input className="form-control" type="text" />
            </div>
            <Link>Upload</Link>
            <Lineicons icon={Bell1Outlined} color="black" size={40}/>
            <Lineicons icon={Message2Stroke} color="blue" size={40}/>
        </nav>
    )
}
export default NavigationBar;