import React, { useEffect, useState } from 'react'
import "./SidebarChat.css"
import { Avatar } from '@mui/material'
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from './firestoreConfigs'
import { Link } from 'react-router-dom';

function SidebarChat({ id, name, addNewChat }) {

  const [seed, setSeed] = useState("")
  const [messages, setMessages] = useState("")

  // useEffect(() => {
  //   if(id) {
  //     db.collection("rooms").doc(id).collection("messages").orderBy("timestamp", "desc").onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())))
  //   }
  // }, [])

  useEffect(() => {

    if (id) {
      const messagesQuery = query(collection(db, "rooms", id, "messages"), orderBy("timestamp", "desc")); // Optimized query definition

      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      }, (error) => {
        console.error('Error fetching messages:', error); // Error handling
      });

      // Cleanup function to unsubscribe on unmount
      return () => unsubscribe();
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random()*5000))
  }, [])

  const createChat = async () => {
    // const roomName = prompt("Please enter name for chat")

    // if(roomName){
    //   // do some clever database stuff...
    //   db.collections("rooms").add({
    //     name: roomName
    //   })
    // }
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
        // Access the rooms collection using collection(db, "rooms")
        const roomsCollectionRef = collection(db, "rooms");

        // try {
        // Use addDoc to add a new document
        const docRef = await addDoc(roomsCollectionRef, {
            name: roomName,
        });
        // console.log("Room added with ID:", docRef.id);
        // } catch (error) {
        // console.error("Error adding chat:", error);
        // }
    }
}

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
            <Avatar src = {`https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}`}/>
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
            </div>
        </div>
    </Link>  
  ): (
    <div onClick = {createChat} className="sidebarChat">
      <h2>Add new chat</h2>
    </div>
  )
}

export default SidebarChat
