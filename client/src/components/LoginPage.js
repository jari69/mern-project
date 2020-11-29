import React, { Component } from 'react'
import axios from 'axios';

export class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){ 
        this.setState({ 
          [event.target.name] : event.target.value 
        }) 
    }

    handleSubmit(event) {
        const { email, password } = this.state;
        alert('Email: ' + email + 'Password: ' + password);
        event.preventDefault();

        axios.post('/api/login', {
                email: email,
                password: password
            })
            .then((response)=>{
                console.log(response);

            })
            .catch((error) => {
                console.log(error);
            });
    }
      
    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                    Email:
                    <input name="email" type="text" value={this.state.email} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>
                    Password:
                    <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default LoginPage
