import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class RegisterForm extends React.Component{
    constructor(){
        super();
        this.state={
            username:'',
            password1:'',
            password2:''
        }
    }
    componentDidMount(){
        localStorage.setItem('savedPage','/signup')
    }
    onChangeHandler=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmitHandler=(e)=>{
        e.preventDefault();
        const newUserObj={
            username: this.state.username,
            password1: this.state.password1,
            password2: this.state.password2
        }
        axios.post('https://new-school-mud.herokuapp.com/api/registration/',newUserObj)
            .then(res=>{
                localStorage.setItem('token',res.data.key)
                this.props.history.push('/main');
            })
            .catch(err=>console.log(err))
    }
    redirect=()=>{
        this.props.history.push('/login');
    }
    render(){
        return(
            <form onSubmit={this.onSubmitHandler}>
                <input onChange={this.onChangeHandler} type='text' name='username' value={this.state.username} placeholder='Enter username.'/>
                <input onChange={this.onChangeHandler} type='password' name='password1' value={this.state.password} placeholder='Enter password.'/>
                <input onChange={this.onChangeHandler} type='password' name='password2' value={this.state.password} placeholder='Enter password.'/>
                <button type='submit'>Create New User</button>
                <button type='button' onClick={this.redirect}>Already have an account?</button>
            </form>
        )
    }
}
export default withRouter(RegisterForm);