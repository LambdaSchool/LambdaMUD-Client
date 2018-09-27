import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
    padding: 0 10px;
    text-align: left;
    border: 1px solid #457B9D;
    border-radius: 5px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.16), 0 6px 6px rgba(45,45,45,0.23);
    background: rgba(240, 240, 240, .7);
    margin: 20px 0;
    min-height: 48em;
`

const Hr = styled.hr`
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, .1), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, .1));
`


const MessageLog = (props) => {
    // const header = 
    // `
    // ██╗      █████╗ ███╗   ███╗██████╗ ██████╗  █████╗      █████╗ ██████╗ ██╗   ██╗███████╗███╗   ██╗████████╗██╗   ██╗██████╗ ███████╗
    // ██║     ██╔══██╗████╗ ████║██╔══██╗██╔══██╗██╔══██╗    ██╔══██╗██╔══██╗██║   ██║██╔════╝████╗  ██║╚══██╔══╝██║   ██║██╔══██╗██╔════╝
    // ██║     ███████║██╔████╔██║██████╔╝██║  ██║███████║    ███████║██║  ██║██║   ██║█████╗  ██╔██╗ ██║   ██║   ██║   ██║██████╔╝█████╗  
    // ██║     ██╔══██║██║╚██╔╝██║██╔══██╗██║  ██║██╔══██║    ██╔══██║██║  ██║╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ██║   ██║██╔══██╗██╔══╝  
    // ███████╗██║  ██║██║ ╚═╝ ██║██████╔╝██████╔╝██║  ██║    ██║  ██║██████╔╝ ╚████╔╝ ███████╗██║ ╚████║   ██║   ╚██████╔╝██║  ██║███████╗
    // ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═════╝ ╚═════╝ ╚═╝  ╚═╝    ╚═╝  ╚═╝╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝
    
    //                                         List of Commands:
    
    //                 [move <direction>]   Move to room in corresponding direction
    //                 [say]                Broadcast a message to other players in the room   
    // `
    return (
        <Div className="game-messageLog">
            {props.messages.map((msgs, index) =>  {
                return (
                <div key={`msgs-${index}`}>
                    {msgs.map((msg,index) => <p key={`msg-${index}`}>{msg}</p>)}
                    <Hr/>
                </div>
            )})}
        </Div>
    );
}

export default MessageLog;