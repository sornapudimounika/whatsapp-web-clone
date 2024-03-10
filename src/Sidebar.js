import "./Sidebar.css"
import {Avatar, IconButton} from "@mui/material"
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {SearchOutlined} from "@mui/icons-material"
import SidebarChat from './SidebarChat';
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firestoreConfigs"

function Sidebar() {
    
    const [rooms, setRooms] = useState()

    const getRooms = async() => {
        const querySnapshot = await getDocs(collection(db, "rooms"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
        // setRooms(rooms)
    }

    useEffect(() => {
        getRooms()
    }, [])

  return (
    <div className='sidebar'>
      <div className="sidebar__header">
        <Avatar />
        <div className="sidebar__headerRight">
            <IconButton>
                <DonutLargeIcon />
            </IconButton>
            <IconButton>
                <ChatIcon />
            </IconButton>
            <IconButton>
                <MoreVertIcon />
            </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
            <SearchOutlined />
            <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
      </div>
    </div>
  )
}

export default Sidebar
