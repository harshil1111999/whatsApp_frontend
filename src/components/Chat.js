import React, { useState } from 'react'
import '../styling/Chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import background from '../assets/background.jpg'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import axios from '../axios';

function Chat({messages}) {
    
    const [text, setText] = useState('')

    const sendMessage = (e) => {
        e.preventDefault()
        if(text !== '') {
            axios.post('/messages/new', {
                "message": text,
                "name": "harshil",
                "timestamp": new Date().toLocaleString('en-US', {timeZone: "Asia/Kolkata"}),
                "received": false
            })
            .then(setText(''))
            .catch(err => console.log(err))
        }
    }

    return (
        <div className="is-flex" style={{flex: 0.65, flexDirection: "column", paddingRight: "10px"}}>

            {/* chat header */}
            <div className="is-flex" style={{width: "100%", justifyContent: "space-between", alignItems: "flex-start", padding: "10px", borderBottom: "1px solid lightgrey", height: "fit-content"}}>
                <div className="is-flex" style={{alignItems: "center"}}>
                    <Avatar />
                    <div className="is-flex" style={{flexDirection: "column", marginLeft: "20px"}}>
                        <h2 className="subtitle" style={{margin: 0, fontWeight: "bold"}}>Room Name</h2>
                        <p style={{color: "gray"}}>Last seen at...</p>
                    </div>
                </div>
                <div className="is-flex">
                    <IconButton><SearchOutlinedIcon/></IconButton>
                    <IconButton><AttachFileIcon/></IconButton>
                    <IconButton><MoreVertIcon/></IconButton>
                </div>
            </div>

            {/* chat body */}
            <div className="is-flex" style={{backgroundImage: `url(${background})`, flex: 1, padding: "30px", flexDirection: "column", overflow: "auto"}}>
                
                {
                    messages.map(message => {
                            if(message.received) {
                                return (
                                    <div className="is-flex" style={{flexDirection: "column"}}>
                                        <p style={{fontWeight: "bold", height: "fit-content", color: "whitesmoke", fontSize: "16px", marginLeft: "5px"}}>{message.name}</p>
                                        <p style={{width: "fit-content", background: "white", padding: "2px 10px", fontSize: "16px", borderRadius: "10px", height: "fit-content", marginBottom: "10px"}}>
                                            {message.message}<span style={{fontSize: "10px", marginLeft: "10px"}}>{message.timestamp}</span>
                                        </p>
                                    </div>
                                )            
                            } else {
                                return (
                                    <div className="is-flex" style={{flexDirection: "column", marginLeft: "auto"}}>
                                        <p style={{fontWeight: "bold", height: "fit-content", color: "whitesmoke", fontSize: "16px", marginLeft: "5px"}}>{message.name}</p>
                                        <p style={{width: "fit-content", background: "#dcf8c6", padding: "2px 10px", fontSize: "16px", borderRadius: "10px", height: "fit-content", marginBottom: "10px"}}>
                                            {message.message}<span style={{fontSize: "10px", marginLeft: "10px"}}>{message.timestamp}</span>
                                        </p>
                                    </div>
                                )
                            }
                        }
                    )
                }
            </div>

            {/* chat footer */}
            <div className="is-flex" style={{alignItems: "center", justifyContent: "space-between", background: "white", borderRadius: "20px",margin: "5px 0", marginLeft: "10px"}}> 
                <IconButton><InsertEmoticonIcon /></IconButton>
                <form className="is-flex" style={{flex: 1}} onSubmit={sendMessage}>
                    <input placeholder="Write a message..." value={text} onChange={(e) => setText(e.target.value)} type="text" style={{width: "100%", outlineWidth: 0, border: "none", fontSize: "16px"}}/>
                    <IconButton><SendIcon onClick={sendMessage}/></IconButton>
                    <IconButton><MicIcon /></IconButton>
                </form>
            </div>
        </div>
    )
}

export default Chat
