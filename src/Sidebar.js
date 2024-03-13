import "./Sidebar.css"
import {Avatar, IconButton} from "@mui/material"
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {SearchOutlined} from "@mui/icons-material"
import SidebarChat from './SidebarChat';
import { collection, getDocs, onSnapshot, unsubscribe } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { db } from "./firestoreConfigs"
import { useStateValue } from "./DataProvider";

function Sidebar() {
    
    const [rooms, setRooms] = useState([])
    const [{ user }, dispatch] = useStateValue()

    const unsubscribeRef = useRef(null);

    // const getRooms = async() => {
    //     const querySnapshot = await getDocs(collection(db, "rooms"));
    //     console.log(querySnapshot)
    //     setRooms(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    //     // setRooms(rooms)
    // }

    useEffect(() => {
        unsubscribeRef.current = onSnapshot(collection(db, "rooms"), (querySnapshot) => {
          const newRooms = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setRooms(newRooms);
        });
      
        return () => {
          if (unsubscribeRef.current) {
            unsubscribeRef.current();
          }
        };
      }, []);

  return (
    <div className='sidebar'>
      <div className="sidebar__header">
        <Avatar src={user?.photoURL}/>
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
            {rooms && rooms.map(room => (
            <SidebarChat key={room.id} id={room.id} 
            name={room.id ? room.name : 'Loading...'} />
            ))}
      </div>
    </div>
  )
}

export default Sidebar
