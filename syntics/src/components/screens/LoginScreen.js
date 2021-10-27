import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, link} from 'react-router-dom';
// import "./LoginScreen.css";

const LoginScreen = ({history}) => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    useEffect(() => {
        if(localStorage.getItem("authToken")){
            history.push("/dashboard");
        }
    }, [history]);
    const loginHandler = async (e) => {
        e.preventDefault();
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        };
        
        try {
            const {data} = await axios
            .post("/api/auth/login", {email,password},
            config);
            localStorage.setItem("authToken", data.token);
            history.push("/dashboard")
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() =>{
                setError("");
            }, 5000);

        }
    };
        return(
            <div>
                <div className="my-5 container">
                    <br /><br /><br /><br />
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <form onSubmit={loginHandler}>
                                <h3>Login In</h3>
                              
                                {/* {error && <span className="alert alert-danger">{error}</span>} */}
                                {error && <span className="m-5 alert alert-danger">Enter your correct credentials</span>}
                                
                                <div className="form-group">
                                    <label>Email</label>
                                    <input required tabIndex={1} type="email" placeholder="Email" value={email} className="form-control" onChange={(e) =>setEmail(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Password (6 Characters) : <Link to="/forgotpassword" tabIndex={4}>Forgot Password?</Link></label>
                                    <input required tabIndex={2} type="password" placeholder="Password" value={password} className="form-control" onChange={(e) =>setPassword(e.target.value)} />
                                </div>
                               
                                
                                <button tabIndex={3} className="btn btn-secondary text-white btn-block">Login</button> <br />
                                <span>Do not have an account? <Link to="/register">Register</Link></span>
                            </form>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                    <br /><br /><br /><br />
                </div>
            </div>
        )
    
    
}

export default LoginScreen;