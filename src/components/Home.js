import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar'
import Chat from './Chat'
import Pusher from 'pusher-js'
import axios from '../axios'

function Home({setUser, user}) {

  const [messages, setMessages] = useState([])
  const [roomName, setRoomName] = useState("")
  const [width, setWidth] = useState(window.innerWidth)
  const [visible, setVisible] = useState(true)
  const [roomId, setRoomId] = useState("")
  const [fetched, setFetched] = useState(false)

  function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth))
    return (() => window.removeEventListener("resize", () => setWidth(window.innerWidth)))
  }, [])

  useEffect(() => {
    if(roomId !== "") {
      axios.get(`/messages/${roomId}`)
      .then(res => {
        setMessages(res.data[0]?.messages)
        setRoomName(res.data[0]?.roomName)
        setFetched(true)
      }).catch(err => console.log(err))
    }
  }, [roomId, user.number])

  useEffect(() => {
    const pusher = new Pusher('4390e22da44cedc07f6c', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('updated', function(data) {
      if(!isEmpty(data)) {
        console.log(data)
        setMessages([...messages, data])
      } else {
        setMessages([...messages])
      }
    });

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }

  }, [messages])

  return (
    <div className="is-flex" style={{height: "100vh", background: "#dadbd3", justifyContent: "center", alignItems: "center"}}>
    {
      width <= 500 ? (
        <div className="box is-flex" style={{justifyContent: "center", boxShadow: "-1px 4px 20px -4px rgba(0,0,0,0.75)", background: "#ededed", height: "90%", width: "90%", padding: "0"}}>
          {visible ? <Sidebar setVisible={setVisible} setUser={setUser} user={user} setRoomId={setRoomId}/> : 
          <Chat roomName={roomName} number={user.number} fetched={fetched} messages={messages} setVisible={setVisible} name={user.name} roomId={roomId}/>}
        </div>
      ) : (
        <div className="box is-flex" style={{justifyContent: "center", boxShadow: "-1px 4px 20px -4px rgba(0,0,0,0.75)", background: "#ededed", height: "90%", width: "90%", padding: "0"}}>
          <Sidebar setVisible={setVisible} setUser={setUser} user={user} setRoomId={setRoomId}/>
          <Chat roomName={roomName} number={user.number} fetched={fetched} messages={messages} setVisible={setVisible} name={user.name} roomId={roomId}/>
        </div>
      )
    }
    </div>
  );
}

export default Home;
