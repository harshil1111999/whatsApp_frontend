import React, { useState } from 'react'
import '../styling/Sidebar.css'
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import AddIcon from '@material-ui/icons/Add';
import { useForm } from 'react-hook-form';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from '../axios';
import bson from 'bson'

function Sidebar({ setVisible, setUser, user, setRoomId, rooms, setRooms }) {

    const [show, setShow] = useState("")
    const [people, setPeople] = useState(new Set())
    const { register, errors, handleSubmit } = useForm();
    const [count, setCount] = useState(0)

    const handleClick = () => {
        localStorage.removeItem('user')
        setUser({})
    }

    const handleAddPeople = () => {
        setCount(count+1)
        setPeople(prevState => new Set([...prevState, count]))
    }

    const handleDelete = (id) => {
        setPeople(prevState => new Set([...prevState].filter(item => item !== id)))
    }

    const onSubmit = async (values) => {
        let arr = Array.from(people.values()).map(item => "number"+item)
        let temp = {}
        temp.roomName = values.roomName
        let id = new bson.ObjectID().toString()
        temp._id = id
        let peoples = Array.from(Object.entries(values)).filter(item => arr.indexOf(item[0]) !== -1)
        peoples = peoples.map(item => {
            return {number: item[1]}
        })
        peoples.push({number: user.number})
        temp.peoples = peoples
        if(peoples.length > 1) {
            axios.post('/createRoom', temp).then(data => {
                let temp1 = {_id: id, roomName: values.roomName}
                setRooms([...rooms, temp1])
                setShow("")
                setCount(0)
                setPeople(new Set())
                document.getElementById("roomName").value = ""
            }).catch(err => console.log(err))
        } else {
            setShow("")
            setCount(0)
            setPeople(new Set())
            document.getElementById("roomName").value = ""
        }
    }

    const handleClose = () => {
        setShow("")
        setCount(0)
        setPeople(new Set())
        document.getElementById("roomName").value = ""
    }

    return (
        <div className="is-flex sidebar" style={{flex: 0.35, flexDirection: "column"}}>
            {/* header */}
            {/* {console.log(rooms)} */}
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
                <div className="is-flex sidebarchat" onClick={() => setShow("is-active")} style={{padding: "20px", cursor: "pointer", alignItems: "center"}}>
                    <AddIcon />
                    <p className="subtitle" style={{marginLeft: "20px"}}>Create Room</p>
                </div>
                {
                    rooms?.map(room => <SidebarChat key={room._id} setVisible={setVisible} room={room} setRoomId={setRoomId}/>)
                }
            </div>

            {/* modal for create room */}
            <div className={`modal ${show}`}>
                <div className="modal-background"></div>
                <div className="modal-card" style={{width: "fit-content"}}>
                    <header className="modal-card-head">
                        <p className="modal-card-title">Create Room</p>
                        <button className="delete" aria-label="close" onClick={handleClose}></button>
                    </header>
                    <section className="modal-card-body">
                        <form onSubmit={handleSubmit(onSubmit)} style={{width: "100%"}}>
                            <div className="is-flex" style={{flexDirection: "column"}}>
                                {/* name */}
                                <div className="field">
                                    <label className="label">Room Name</label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input className="input"
                                            type="text"
                                            id="roomName"
                                            name="roomName"
                                            aria-invalid={errors.name ? "true" : "false"}
                                            ref={register({ required: "Room name is required", 
                                                            maxLength: {
                                                                value: 30,
                                                                message: "Max length exceeded"
                                                            } })}
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fa fa-home" aria-hidden="true"></i>
                                        </span>
                                        {errors.roomName && <p className="help is-danger"><span style={{color: "red"}}>*</span>{errors.roomName.message}</p>}
                                    </div>
                                    {people.size > 0 ? <label className="label" style={{marginTop: "10px"}}>Peoples</label> : ""}
                                    {people.size > 0 ? (
                                        Array.from(people.values()).map(item => (
                                            <div className= "is-flex">
                                                <div className="control has-icons-left has-icons-right" style={{flex: 1}}>
                                                    <input className="input"
                                                        type="number"
                                                        id={`number${item}`}
                                                        name={`number${item}`}
                                                        aria-invalid={errors.name ? "true" : "false"}
                                                        ref={register({ required: "Number is required", 
                                                                        maxLength: {
                                                                            value: 10,
                                                                            message: "Number should be of 10 digits"
                                                                        },
                                                                        minLength: {
                                                                            value: 10,
                                                                            message: "Number should be of 10 digits"
                                                                        } 
                                                                    })}
                                                    />
                                                    <span className="icon is-small is-left">
                                                        <i className="fa fa-mobile" aria-hidden="true"></i>
                                                    </span>
                                                </div>
                                                <IconButton onClick={() => handleDelete(item)}><DeleteIcon /></IconButton>
                                            </div>
                                        ))
                                    ) : ""}
                                </div>
                            </div>
                        </form>
                    </section>
                    <footer className="modal-card-foot" style={{justifyContent: "flex-end"}}>
                        <button className="button is-success" onClick={handleAddPeople}>Add people</button>
                        <button className="button is-success" onClick={handleSubmit(onSubmit)}>Create</button>
                        <button className="button" onClick={handleClose}>Cancel</button>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
