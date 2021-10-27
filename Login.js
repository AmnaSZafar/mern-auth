import React, {Component} from 'react';
import axios from 'axios';
export default class Login extends Component{
    handleSubmit = e => {
        e.preventDefault();
        const data = {
            
            email: this.email,
            password: this.password
           
        };
        axios.post('login', data).then(
            res => {
                console.log(res);
            }
        ).catch(
            err => {
                console.log(err);
            }
        );
        console.log(data);
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
                                <h3>Login</h3>
                                
                                <div className="form-group">
                                    <label>Email</label>
                                    <input required type="email" placeholder="Email" name="email" className="form-control" onChange={e => this.email = e.target.value} />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input required type="password" placeholder="Password" name="password" className="form-control" onChange={e => this.password = e.target.value} />
                                </div>
                               
                                <button className="btn btn-secondary text-white btn-block">Login</button>
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

