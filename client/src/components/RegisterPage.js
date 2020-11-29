import React, { Component } from 'react';
import axios from 'axios';

export class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            password2: '',
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
        const { firstname, lastname, email, password, password2} = this.state;
        alert('Firstname'+ firstname + 'Email: ' + this.state.email + 'Password: ' + this.state.password);
        event.preventDefault();

        axios.post('/api/register', {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                password2: password2
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
                <h1>Registration</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                    Firstname:
                    <input name='firstname' type="text" value={this.state.firstname} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>
                    Lastname:
                    <input name='lastname' type="text" value={this.state.lastname} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>
                    Email:
                    <input name='email' type="text" value={this.state.email} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>
                    Password:
                    <input name='password' type="password" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>
                    Confirm password:
                    <input name='password2' type="password" value={this.state.password2} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default RegisterPage
