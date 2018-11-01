import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import './Game.css';
class Game extends Component {
    state = {
        name: '',
        title: '',
        description: '',
        uuid: '',
        input: '',
        message: '',
        messages: [],
        broadcast: [],
        players: [],
        errorMessage: ''
    }
    componentDidMount() {
        let key = 'Token ' + localStorage.getItem('key')
        const herokuUrl = 'https://jenniferplayer-lambdamud.herokuapp.com'
        axios.get(`${herokuUrl}/api/adv/init`, {
            headers: {
                "Authorization": key
            }
        })
            .then(response => {
                this.setState({ 
                    name: response.data.name,
                    title: response.data.title,
                    description: response.data.description,
                    uuid: response.data.uuid,
                    players: response.data.players,
                 })
                var pusher = new Pusher('77b6a1c93ca350c8fd58', {
                    cluster: 'us2'
                });
                var channel = pusher.subscribe(`p-channel-${this.state.uuid}`);
                channel.bind("broadcast", response => {
                    console.log(response.message);
                    this.setState({
                        broadcast: this.state.broadcast.concat([response.message]),
                    });
                });
            })
            .catch(error => {
                console.log(error.response)
            })
    }
    inputChangeHandler = event => {
        this.setState({ [event.target.name]: event.target.value })
    };
    submitHandler = event => {
        if (this.state.input.startsWith('say')) {
            this.handleSay(event)
        } else if (this.state.input.startsWith('move')) {
            this.handleMove(event)
        } else {
            this.handleError(event)
        }
    };
    handleMove = event => {
        event.preventDefault();
        const herokuUrl = 'https://jenniferplayer-lambdamud.herokuapp.com'
        let key = 'Token ' + localStorage.getItem('key')
        const direction = this.state.input[5];

        axios.post(`${herokuUrl}/api/adv/move`,
            { "direction": direction },
            {
                headers: {
                    "Authorization": key,
                    "Content-Type": "application/json"
                }
            }).then(response => {
                this.setState({ 
                    name: response.data.name,
                    title: response.data.title,
                    description: response.data.description,
                    players: response.data.players,
                    errorMessage: response.data.error_msg
                 })
            })
    }
    handleSay = event => {
        event.preventDefault();
        const herokuUrl = 'https://jenniferplayer-lambdamud.herokuapp.com'
        let key = 'Token ' + localStorage.getItem('key')
        const message = this.state.input.slice(4)
        axios.post(`${herokuUrl}/api/adv/say`,
            { "message": message },
            {
                headers: {
                    "Authorization": key,
                    "Content-Type": "application/json"
                }
            }).then(response => {
                this.setState({ 
                    broadcast: this.state.broadcast.concat(response.data.message),
                    messages: this.state.messages.concat(response.data.message.slice(0, -1)),
                    errorMessage: ''
                })
                console.log(response)
            })
    }
    handleError = event => {
        event.preventDefault();
        this.setState({
            errorMessage: 'Invalid input, use say to talk in the room or move direction to continue to a different room'
        })

    }
    render() {
        return (
            <div className="game-container">
                <div className="currently-logged"> Currently logged in as  {this.state.name}</div>
                <div className='location'> Location: {this.state.title}</div>
                <div className='location'> {this.state.description}</div>
                <div> <p>Other users: {this.state.players.join(', ')}</p></div>
                <div> {this.state.broadcast.map((message, i) => <p key={i}>{message}</p>)} </div>
                <form className='game-form' onSubmit={this.submitHandler}>
                    <input
                        value={this.state.input}
                        onChange={this.inputChangeHandler}
                        type="text"
                        name="input"
                        placeholder="Enter command here" />
                    <button type="submit">
                        Enter
                    </button>
                </form>
                <div className='error'> {this.state.errorMessage} </div>
            </div>
        );
    }
}
export default Game; 