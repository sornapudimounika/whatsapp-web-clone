import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { Avatar, IconButton } from '@mui/material'
import { AttachFile, InsertEmoticon, MicOutlined, MoreVert, SearchOutlined } from '@mui/icons-material'

function Chat() {

    const [seed, setSeed] = useState("")
    useEffect(() => {
      setSeed(Math.floor(Math.random()*5000))
    }, [])

    const [input, setInput] = useState("");
    const sendMessage = (e) => {
        e.preventDefault()
        console.log('you typed >>> ', input)
        setInput('')
    }

    return (
        <div className='chat'>
            <div className="chat__header">
                <Avatar src = {`https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}`}/>
                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                <p className={`chat__message ${true && "chat__reciever"}`}>
                    <span className="chat__name">
                        Mounika
                    </span>
                    Hey guys
                    <span className="chat__timestamp">
                        12:34PM
                    </span>
                </p>
            </div>
            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
                    <button onClick={sendMessage} type="submit"> Send a message </button>
                </form>
                <MicOutlined />
            </div>
        </div>
    )
}

export default Chat
