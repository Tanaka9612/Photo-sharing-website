import {Link} from 'react-router-dom';
function Login(){
    return(
        <div className="login">
            <h1>Login Here</h1>
            <form action="">
                <div className="form-group">
                    <label htmlFor="" className='login-form'>Email:</label>
                    <input className="form-control sm" type="email"/>
                </div>
                <div className="form-group">
                    <label className="form-label" >Password:</label>
                    <input className="form-control" type="password"/>
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