import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar'
import Chat from './Chat'
import Pusher from 'pusher-js'
import axios from '../axios'

function Home({setUser}) {

  const [messages, setMessages] = useState([])

  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    axios.get('/messages/sync')
    .then(res => {
      setMessages(res.data)
    }).catch(err => console.log(err))

    window.addEventListener("resize", () => setWidth(window.innerWidth))
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

  const [visible, setVisible] = useState(false)

  return (
    <div className="is-flex" style={{height: "100vh", background: "#dadbd3", justifyContent: "center", alignItems: "center"}}>
    {
      width <= 500 ? (
        <div className="box is-flex" style={{justifyContent: "center", boxShadow: "-1px 4px 20px -4px rgba(0,0,0,0.75)", background: "#ededed", height: "90%", width: "90%", padding: "0"}}>
          {visible ? <Sidebar setVisible={setVisible} setUser={setUser}/> : <Chat messages={messages} setVisible={setVisible}/>}
        </div>
      ) : (
        <div className="box is-flex" style={{justifyContent: "center", boxShadow: "-1px 4px 20px -4px rgba(0,0,0,0.75)", background: "#ededed", height: "90%", width: "90%", padding: "0"}}>
          <Sidebar setVisible={setVisible} setUser={setUser}/>
          <Chat messages={messages} setVisible={setVisible}/>
        </div>
      )
    }
    </div>
  );
}

export default Home;
