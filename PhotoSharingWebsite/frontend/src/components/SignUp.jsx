import { Link } from "react-router-dom";

function SignUp(){
    return(
        <div className="signup-form">
            <h1>Sign up here</h1>
            <form action="">
                <div className="form-group">
                    <label className="form-label" htmlFor="">Email</label>
                    <input className="form-control"type="email" />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="">Password</label>
                    <input className="form-control"type="password" />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="">Confirm Password</label>
                    <input className="form-control" type="password" />
                </div>
                <button className="signup-button">SignUp</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default SignUp;