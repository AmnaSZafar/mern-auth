import { useState } from "react";
import axios from "axios";
// import "./ForgotpasswordScreen.css";

const ForgotpasswordScreen = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const forgotPasswordHandler = async (e) => {
        e.preventDefault();
        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            const {data} = await axios.post(
                "/api/auth/forgotpassword", 
                { email }, 
                config
            );
            setSuccess(data.data);
            
        } catch (error) {
            setError(error.response.data.error);
            setEmail("");
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };
    return(
        <div className="container my-5">
            <br /><br /><br /><br /><br /><br />
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <form onSubmit={forgotPasswordHandler}>
                        {error && <h6 className="m-5 alert alert-danger">{error}</h6>}
                        {success && <h6 className="m-5 alert alert-success">{success}</h6>}
                        <h3>Forgot Password</h3>
                        
                        <p>Please provide the email address from which you registered your account with. We will send you a reset password link to your email</p>
                        <div className="form-group">
                            <label>Email</label>
                            <input required type="email" placeholder="Email" value={email} className="form-control" onChange={(e) =>setEmail(e.target.value)} />
                        </div>
                        <button className="btn btn-secondary text-white btn-block">Register</button>
                                        
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
            <br /><br /><br /><br /><br /><br />
            
        </div>
    );
};

export default ForgotpasswordScreen;