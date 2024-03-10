import React, { useEffect, useState } from 'react'
import "./SidebarChat.css"
import { Avatar } from '@mui/material'

function SidebarChat(/*{ id, name, addNewChat }*/) {

  const [seed, setSeed] = useState("")
  useEffect(() => {
    setSeed(Math.floor(Math.random()*5000))
  }, [])

  // const createChat = () => {
  //   const roomName = prompt("Please enter name for chat")

  //   if(roomName){
  //     // do some clever database stuff...
  //   }
  // }

  return /*!addNewChat ? */(
    <div className="sidebarChat">
        <Avatar src = {`https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}`}/>
        <div className="sidebarChat__info">
            {/* <h2>{name}</h2> */}
            <h2>
              chatName
            </h2>
            <p>This is the last message</p>
        </div>
    </div>
  )
  // : (
  //   <div onClick = {createChat} className="sidebarChat">
  //     <h2>Add new chat</h2>
  //   </div>
  // )
}

export default SidebarChat
