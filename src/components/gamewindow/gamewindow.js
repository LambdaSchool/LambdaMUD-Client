/**
 * This is the main game page where all the game actions take place.
 */

import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Pusher from "pusher-js";

const LogoutContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 10px;
`;
const GameContainer = styled.div`
  width: 50vw;
  margin: 0 auto;
`;
const LamdaTitle = styled.h1`
  font-family: "Fredericka the Great", cursive;
  font-size: 64px;
  margin: 15px auto;
  text-shadow: 3px 3px 0 darkslategray, -1px -1px 0 darkslategray,
    1px -1px 0 darkslategray, -1px 1px 0 darkslategray, 1px 1px 0 darkslategray;
  color: white;
  text-align: center;
`;
const GameWindowContainer = styled.div`
  font-family: "Fredericka the Great", cursive;
  width: 50vw;
  margin: 75px auto 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;
const RoomContainer = styled.div`
  font-family: "Fredericka the Great", cursive;
  width: 600px;
  height: 300px;
  margin: 20px;
  border: 2px solid black;
  text-align: center;
`;
const PlayersContainer = styled.div`
  font-family: "Fredericka the Great", cursive;
  width: 200px;
  height: 300px;
  margin: 20px;
  border: 2px solid black;
  text-align: center;
`;
const MessageWindow = styled.div`
  font-family: 'Fredericka the Great', cursive;
  width: 400px;
  height: 200px;
  overflow: auto;
  margin: 20px 20px 0;
  background: white
  border: 2px solid black;
  text-align: left;
  padding-left: 5px;
`;
const InfoWindow = styled.div`
  font-family: "Fredericka the Great", cursive;
  margin: 20px;
  background: white;
  border: 1px solid black;
  border-radius: 5px;
  overflow: auto;
  text-align: center;
`;
const DescriptionWindow = styled.div`
  font-family: "Fredericka the Great", cursive;
  margin: 20px;
  height: 100px;
  background: white;
  border: 1px solid black;
  border-radius: 5px;
`;
const CommandWindow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CommandInput = styled.input`
  width: 346px;
  padding: 0;
`;

class GameWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        description: "",
        name: "",
        players: [],
        title: "",
        uuid: ""
      },
      messages: [],
      message: "",
      error_msg: ""
    };
  }

  componentDidMount() {
    // When the component loads there is a check if there is an authentication token
    // in local storage. If there is the token is added to the header and sent in a GET
    // request to the server to pull down initial player data as well as subscribe to
    // the proper pusher channel. If there is no token the player is redirected to the
    // login page.
    if(localStorage.getItem("key")) {
      const headersAuthorization = {
        headers: { Authorization: `Token ${localStorage.getItem("key")}` }
      };
      console.log(localStorage.getItem("key"));
      axios
        .get(
          "https://lambdamud-alee.herokuapp.com/api/adv/init",
          headersAuthorization
        )
        .then(response => {
          this.setState({ player: response.data });
          console.log(this.state.player);
          const pusher = new Pusher("8b66e774f66ca1dd3215", {
            cluster: "us2"
          });
          const channel = pusher.subscribe(`p-channel-${response.data.uuid}`);
          channel.bind("broadcast", response => {
            const system = Object.values(response).toString();
            let messages = [...this.state.messages];
            messages.push(system);
            this.setState({ messages });
          });
        })
        .catch(err => console.log(err));
    } else {
      this.props.history.push("/login");
    }    
  }

  // haandles text changes from an input and adds it to the state.
  handleTextChange = event => {
    this.setState({ [event.target.name]: event.target.value });

  };
  // logs players out, clearing the token and redirecting to the login page.
  handleLogout = () => {
    localStorage.clear();
    this.props.history.push("/login");
  };

  // This function grabs the authentication token from localStorage and adds it to 
  // the header for server requests.It takes the message string being input and splits 
  // it into an array. If the [0] of the array matches a predetermined command it will 
  // execute a specific action. "/s" will broadcast any string after it to the current room.
  // "go" will move the player into an ajoining room in the direction followng the initial
  // command. And "/help" will display the list of commands to be used.
  submitCommand = event => {
    event.preventDefault();
    const headersAuthorization = {
      headers: { Authorization: `Token ${localStorage.getItem("key")}` }
    };
    const messageArr = this.state.message.toLowerCase().split(" ");
    if (messageArr[0] === "/s") {
      messageArr.shift();
      let mymessage = messageArr.join(" ");
      axios
        .post(
          "https://lambdamud-alee.herokuapp.com/api/adv/say/",
          { message: mymessage },
          headersAuthorization
        )
        .then(response => {
          this.setState({
            message: response.data.message
          });
          this.state.messages.push(this.state.message);
          this.setState({
            message: ""
          });
        })
        .catch(err => console.log(err));
    } else if (messageArr[0] === "go") {
      if (messageArr[1] === "n" || "s" || "e" || "w") {
        axios
          .post(
            "https://lambdamud-alee.herokuapp.com/api/adv/move/",
            { direction: messageArr[1] },
            headersAuthorization
          )
          .then(response => {
            if (response.data.error_msg !== null) {
              this.setState({
                player: response.data,
                message: response.data.error_msg
              });
              this.state.messages.push(this.state.message);
            } else {
              this.setState({
                player: response.data,
                message: response.data.message
              });
            }
            this.setState({
              message: ""
            });
          })
          .catch(err => console.log(err));
      }
    } else if(messageArr[0] === "/help") {
      this.state.messages.push(
        "Commands you need to know: \n go: use go and then a direction to move in that direction ex. <go n>\n /s: use /s followed by text to say that outloud to everyone in the room, ex </s Hey everyone!>");
      this.setState({
        message: ""
      });
    } else {
      this.state.messages.push("That is not a valid command!");
      this.setState({
        message: ""
      });
    }
  };

  render() {
    return (
      <GameContainer>
        <LogoutContainer>
          <button onClick={this.handleLogout}>Logout</button>
        </LogoutContainer>
        <LamdaTitle>LambdaMUD</LamdaTitle>
        <GameWindowContainer>
          <RoomContainer>
            <h2>Current Location:</h2>
            <InfoWindow>
              <h3>{this.state.player.title}</h3>
            </InfoWindow>
            <DescriptionWindow>
              <h4>{this.state.player.description}</h4>
            </DescriptionWindow>
          </RoomContainer>
          <PlayersContainer>
            <h3>Players in the Room:</h3>
            <InfoWindow>
              {this.state.player.players.length !== 0 ? 
                <h4>{this.state.player.players.map(player => {
                  return (
                    <span>
                      {player}
                      <br/>
                    </span>
                  )
                })}</h4> : (
                <h4>No One</h4>
              )}
            </InfoWindow>
          </PlayersContainer>
          <CommandWindow>
            <MessageWindow>
              {this.state.messages.map(message => {
                return (
                  <div key={message}>
                    <p>{message}</p>
                  </div>
                );
              })}
            </MessageWindow>
            <div>
              <form onSubmit={this.submitCommand}>
                <CommandInput
                  type="text"
                  placeholder="Enter Command or type </help>"
                  onChange={this.handleTextChange}
                  value={this.state.message || ""}
                  name="message"
                />
                <button>Submit</button>
              </form>
            </div>
          </CommandWindow>
        </GameWindowContainer>
      </GameContainer>
    );
  }
}

export default GameWindow;
