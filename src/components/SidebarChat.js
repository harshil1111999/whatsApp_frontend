import React from 'react'
import { Avatar } from '@material-ui/core';
import '../styling/SidebarChat.css'

function SidebarChat() {
    return (
        <div className="is-flex sidebarchat" style={{padding: "20px", cursor: "pointer", alignItems: "center"}}>
            <Avatar />
            <div className="is-flex" style={{flexDirection: "column", marginLeft: "15px"}}>
                <h2 className="subtitle" style={{margin: "0", fontWeight: "bold", fontSize: "16px", marginBottom: "8px"}}>Room name</h2>
                <p>Last message</p>
            </div>
        </div>
    )
}

export default SidebarChat
