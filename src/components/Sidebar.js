import React from 'react'
import '../styling/Sidebar.css'
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';

function Sidebar({ setVisible, setUser }) {

    const handleClick = () => {
        localStorage.removeItem('user')
        setUser({})
    }

    return (
        <div className="is-flex sidebar" style={{flex: 0.35, flexDirection: "column"}}>
            
            {/* header */}
            <div className="is-flex" style={{justifyContent: "space-between", padding: "10px", borderRight: "1px solid lightgrey", width: "100%"}}>
                <div className="container">
                    <Avatar />
                </div>
                <div className="is-flex" style={{}}>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <div className="dropdown is-hoverable">
                        <div className="dropdown-trigger">
                            <IconButton className="navbar-link is-arrowless"><MoreVertIcon/></IconButton>
                        </div>
                        <div className="dropdown-menu" id="dropdown-menu" role="menu">
                            <div className="dropdown-content" style={{width: "70px"}}>
                                <button onClick={handleClick} style={{width: "100%", height: "100%", cursor: "pointer", border: "none", background: "transparent", outline: "0px"}}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* searchbar */}
            <div className="is-flex" style={{width: "100%", alignItems: "center", padding: "10px", background: "#f6f6f6"}}>
                <div className="box is-flex" style={{borderRadius: "20px", background: "white", width: "100%", alignItems: "center", padding: "0"}}>
                    <SearchOutlinedIcon style={{color: "gray", height: "35px", marginLeft: "10px"}}/>
                    <div className="control" style={{width: "100%", marginLeft: "10px"}}>
                        <input type="text" placeholder="Search or start new chat" style={{outlineWidth: "0", border: "none"}}/>
                    </div>
                </div>
            </div>

            {/* sidebarchat */}
            <div className="is-flex" style={{flexDirection: "column", background: "white", flex: 1, overflow: "auto", marginBottom: "5px"}}>
                <SidebarChat setVisible={setVisible}/>
                <SidebarChat setVisible={setVisible}/>
                <SidebarChat setVisible={setVisible}/>
            </div>

        </div>
    )
}

export default Sidebar
