import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, link} from 'react-router-dom';
// import "./RegisterScreen.css";

const RegisterScreen = ({history}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    useEffect(() => {
        if(localStorage.getItem("authToken")){
            history.push("/dashboard");
        }
    }, [history]);
    const registerHandler = async (e) => {
        e.preventDefault();
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        };
        if (password !== confirmPassword){
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("")
            }, 5000);
            return setError("Passwords do not match");
        }
        try {
            const {data} = await axios
            .post("/api/auth/register", {username, email,password},
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
                            <form onSubmit={registerHandler}>
                            {error && <h6 className="m-5 alert alert-danger">{error}</h6>}<br /><br />
                                <h3>Sign Up</h3>
                                
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input required type="text" value={username} placeholder="Enter Full Name" className="form-control" onChange={(e) =>setUsername(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input required type="email" placeholder="Email" value={email} className="form-control" onChange={(e) =>setEmail(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input required type="password" placeholder="Password" value={password} className="form-control" onChange={(e) =>setPassword(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input required type="password" placeholder="Confirm Password" value={confirmPassword} className="form-control" onChange={(e) =>setConfirmPassword(e.target.value)} />
                                </div>
                                
                                <button className="btn btn-secondary text-white btn-block">Register</button>
                                <span>Already Have an account? <Link to="/login">Login</Link></span>
                            </form>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                    <br /><br /><br /><br />
                </div>
            </div>
        )
    
    
}

export default RegisterScreen;