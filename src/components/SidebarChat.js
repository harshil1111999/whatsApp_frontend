import React from 'react'
import { Avatar } from '@material-ui/core';
import '../styling/SidebarChat.css'

function SidebarChat({setVisible, room, setRoomId}) {

    const handleClick = () => {
        setRoomId(room._id)
        setVisible(false)
    }

    return (
        <div onClick={handleClick} className="is-flex sidebarchat" style={{padding: "20px", cursor: "pointer", alignItems: "center"}}>
            <Avatar />
            <div className="is-flex" style={{flexDirection: "column", marginLeft: "15px", width: "70%"}}>
                <h2 className="subtitle" style={{margin: "0", fontWeight: "bold", fontSize: "16px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "70%"}}>{room.roomName}</h2>
                <p style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "70%"}}>{room.lastMessage}</p>
            </div>
        </div>
    )
}

export default SidebarChat
