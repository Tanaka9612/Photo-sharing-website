import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';


function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async(e)=>{
       e.preventDefault();
        try{
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Login successful!");
                console.log(data.user);

                navigate("/home"); // navigate to home
            } else {
                console.log(data.message);
            }
        }
        catch(error){
            console.error("Login error:", error);
        }
    }


    return(
        <div className="login">
            <h1>Login Here</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label className='login-form'>Email:</label>
                    <input className="form-control sm" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" >Password:</label>
                    <input className="form-control" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        type="password"/>
                </div>
                <button type="submit" className="btn btn primary">Login</button>
            </form>
            <div className="register-link">
                No account? <Link to="/SignUp">Register here</Link>
            </div>
        </div>
    )
}

export default Login;