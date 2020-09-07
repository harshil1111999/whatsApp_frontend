import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import Pusher from 'pusher-js'
import axios from './axios'

function App() {

  const [messages, setMessages] = useState([])

  useEffect(() => {
<<<<<<< HEAD
    axios.get('/messages/sync')
=======
    axios.get('http://localhost:9000/messages/sync')
>>>>>>> ae7ceab89c29dd2cd0d3d69722ea7fcb0a8bb5ef
    .then(res => {
      setMessages(res.data)
    }).catch(err => console.log(err))
  }, [])

  useEffect(() => {
    const pusher = new Pusher('4390e22da44cedc07f6c', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(data) {
      setMessages([...messages, data])
    });

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }

  }, [messages])

  return (
    <div className="is-flex" style={{height: "100vh", background: "#dadbd3", justifyContent: "center", alignItems: "center"}}>
      <div className="box is-flex" style={{justifyContent: "center", boxShadow: "-1px 4px 20px -4px rgba(0,0,0,0.75)", background: "#ededed", height: "90%", width: "90%", padding: "0"}}>
        <Sidebar/>
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
