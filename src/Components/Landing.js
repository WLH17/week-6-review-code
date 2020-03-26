import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../redux/reducer';
import axios from 'axios';

class Landing extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            verPassword: '',
            username: '',
            registerView: false
        }
    }

    //This function will allow a toggle between the login view and the register view of this component. It is paired with the conditional rendering ternary found in the render method.
    handleToggle = () => {
        this.setState({
            registerView: !this.state.registerView
        })
    }

    //This method will handle all of the inputs in this component, by using the name attribute found on each input below. This is a great way to handle many inputs through one function.
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //This function will run send the axios request to the server for logging in, sending the email and password from state.
    handleLogin = () => {
        const {email, password} = this.state;
        axios.post('/api/login', {email, password})
        .then(res => {
            //The response is a user object. This object gets passed into the getUser action(found in reducer.js) to place the user object on redux state.
            this.props.getUser(res.data)
            //Once the user object is on redux state, we use the push method on react-router-doms history object, to push the user to the dashboard page.
            this.props.history.push('/dashboard')
        })
        .catch(err => console.log(err))
    }

    //This function handles the register functionality for a user.
    handleRegister = () => {
        const {email, password, verPassword, username} = this.state;
        //This checks to make sure that 1. The password matches the verPassword and 2. The password isn't an empty string. This is not required but enhances user experience and makes passwords easier to handle on the client-side.
        if(password === verPassword && password !== ''){
            //The axios request sends the email, password, and username to the server to register the user to the database.
            axios.post('/api/register', {email, password, username})
            .then(res => {
                //Just like login, the user object is passed into the getUser action to place the user object on redux state.
                this.props.getUser(res.data)
                //Just like in login, we use the push method to navigate the user to the dashboard view.
                this.props.history.push('/dashboard')
            })
            .catch(err => console.log(err))
        } else if(password !== verPassword){
            //This alerts the user if the password doesn't match the verPassword
            alert('Passwords do not match')
        } else if(password === ''){
            //This alerts the user if they didn't type anything into the password field.
            alert('Password must contain characters')
        }
    }

    render(){
        return(
            <div>
                {/* This ternary toggles the login and register views */}
                {this.state.registerView
                ? (<>
                    <h1>Register Here</h1>
                    <input 
                        placeholder='Email' 
                        name='email' 
                        onChange={(e) => this.handleInput(e)}/>
                    <input 
                        placeholder='Password' 
                        type='password' 
                        name='password'
                        onChange={(e) => this.handleInput(e)}/>
                    <input 
                        placeholder='Verify Password' 
                        type='password' 
                        name='verPassword'
                        onChange={(e) => this.handleInput(e)}/>
                    <input 
                        placeholder='Username' 
                        name='username'
                        onChange={(e) => this.handleInput(e)}/>
                    <button onClick={this.handleRegister}>Register</button>
                    <p>Have an account? <span onClick={this.handleToggle}>Login here.</span></p>
                   </>)
                : (<>
                    <h1>Login Here</h1>
                    <input 
                        placeholder='Email' 
                        name='email'
                        onChange={(e) => this.handleInput(e)}/>
                    <input 
                        placeholder='Password'
                        type='password' 
                        name='password'
                        onChange={(e) => this.handleInput(e)}/>
                    <button onClick={this.handleLogin}>Login</button>
                    <p>Don't have an account? <span onClick={this.handleToggle}>Register here.</span></p>
                   </>)}
            </div>
        )
    }
}

//When you don't need to subscribe to any redux state values, but are using an action, you MUST pass null as the first argument to connect.
export default connect(null, {getUser})(Landing);