import { Link } from "react-router-dom";
import { Lineicons } from "@lineiconshq/react-lineicons";
import {Bell1Outlined, Message2Stroke } from "@lineiconshq/free-icons"
import Profile from "./Profile";
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
            <Link to='/profile' element={<Profile/>}>Profile</Link>
        </nav>
    )
}
export default NavigationBar;