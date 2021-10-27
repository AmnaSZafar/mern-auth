import React, {Component} from 'react';
import axios from 'axios';
export default class Register extends Component{
    handleSubmit = e => {
        e.preventDefault();
        const data = {
            name: this.name,
            email: this.email,
            password: this.password,
            cpassword: this.cpassword
           
        };
        axios.post('register', data)
        .then(res => {
                console.log(res)
            })
        .catch(
            err => {
                console.log(err)
            }
        );
        // console.log(data);
    };
    render(){
        return(
            <div>
                <div className="my-5 container">
                    <br /><br /><br /><br />
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <form onSubmit={this.handleSubmit}>
                                <h3>Sign Up</h3>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input required type="text" placeholder="Full Name" name="name" className="form-control" onChange={e => this.name = e.target.value} />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input required type="email" placeholder="Email" name="email" className="form-control" onChange={e => this.email = e.target.value} />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input required type="password" placeholder="Password" name="password" className="form-control" onChange={e => this.password = e.target.value} />
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input required type="password" placeholder="Confirm Password" name="cpassword" className="form-control" onChange={e => this.cpassword = e.target.value} />
                                </div>
                                
                                <button className="btn btn-secondary text-white btn-block">Register</button>
                            </form>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                    <br /><br /><br /><br />
                </div>
            </div>
        )
    }
}

// export default Register;