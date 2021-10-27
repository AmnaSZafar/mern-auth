import { useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const ResetPasswordScreen = ({match}) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const resetPassswordHandler = async (e) => {
        e.preventDefault();
        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };
        if(password !== confirmPassword){
            setPassword("");
            setConfirmPassword("");
            setTimeout (() => {
                setError("");
            },5000);
            return setError("passwords don't match")
        }

        try {
            const  {data} = await axios
            .put(`/api/auth/resetpassword/${match.params.resetToken}`,
            {
                password,
            },
            config
            );
            console.log(data);
            setSuccess(data.data);

        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };
    return (
        <div className="container my-5">
            <br /><br /><br /><br /><br /><br />
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <form onSubmit={resetPassswordHandler}>
                        {error && <h6 className="m-5 alert alert-danger">{error}</h6>}
                        {success && (
                            <h6 className="m-5 alert alert-success">
                                {success} <Link to="/login">Login</Link>
                            </h6>
                        )}
                        <h3>Reset Password</h3>
                        
                        <div className="form-group">
                            <label>Password</label>
                            <input required type="password" placeholder="Password" value={password} className="form-control" onChange={(e) =>setPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input required type="password" placeholder="Confirm Password" value={confirmPassword} className="form-control" onChange={(e) =>setConfirmPassword(e.target.value)} />
                        </div>
                        
                        <button className="btn btn-secondary text-white btn-block">Reset Password</button>
                                        
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
            <br /><br /><br /><br /><br /><br />
        </div>
    );
}


export default ResetPasswordScreen;