import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


function SignUp(){

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState("");
    const[password2, setPassword2] = useState("");

    const navigate = useNavigate();

    const handleSignUp = async(e)=>{
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    // username,
                    email,
                    password,
                    password2
                })
            });
            const data = await response.json();
            if (response.ok) {
                console.log("Login successful!");
                console.log(data.user);

                navigate("/profile"); // navigate to home
            } else {
                console.log(data.message);
            }
        }catch(e){
            console.error("Registration error: ",e);
        }

    }

    return(
        <div className="signup-form">
            <h1>Sign up here</h1>
            <form onSubmit={handleSignUp}>
                <div className="form-group">
                    <label className="form-label" htmlFor="">Email</label>
                    <input className="form-control"  
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        type="email" />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="">Password</label>
                    <input className="form-control"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        type="password" />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="">Confirm Password</label>
                    <input className="form-control" 
                        value={password2}
                        onChange={(e)=>setPassword2(e.target.value)}
                         type="password" />
                </div>
                <button className="signup-button">SignUp</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default SignUp;