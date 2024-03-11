import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { Avatar, IconButton } from '@mui/material'
import { AttachFile, InsertEmoticon, MicOutlined, MoreVert, SearchOutlined } from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import { db } from './firestoreConfigs'
import { collection, doc, onSnapshot, orderBy, query, addDoc, serverTimestamp } from 'firebase/firestore'
import { useStateValue } from './DataProvider'

function Chat() {

    const [seed, setSeed] = useState("")
    const [input, setInput] = useState("")
    const {roomId} = useParams()
    const [roomName, setRoomName] = useState("")
    const [messages, setMessages] = useState([])
    const [{ user }, dispatch] = useStateValue()

    // useEffect(() => {
    //     if (roomId) {
    //       const roomRef = doc(collection(db, 'rooms'), roomId); // Combine collection and doc reference creation
    //       const unsubscribe = onSnapshot(roomRef, (snapshot) => {
    //         if (snapshot.exists) {
    //           setRoomName(snapshot.data().name); // Access room name from document data
    //         } else {
    //           console.log('Room document not found'); // Handle case where room doesn't exist
    //         }
    //       });
          
    //       db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())))

    //       return () => unsubscribe(); // Cleanup function to unsubscribe on unmount
    //     }
    //   }, [roomId]);

    useEffect(() => {
    
        if (roomId) {
          const roomRef = doc(collection(db, 'rooms'), roomId); // Combined reference creation
    
          // Listen for room document changes
          const unsubscribeRoom = onSnapshot(roomRef, (snapshot) => {
            if (snapshot.exists) {
              setRoomName(snapshot.data().name); // Update room name
            } else {
              console.log('Room document not found'); // Handle non-existent room
            }
          }, (error) => {
            console.error('Error fetching room data:', error); // Error handling
          });
    
          // Listen for messages collection changes
          const messagesQuery = query(collection(db, "rooms", roomId, "messages"), orderBy("timestamp", "asc")); // Optimized query definition
          const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
            setMessages(snapshot.docs.map((doc) => doc.data()));
          }, (error) => {
            console.error('Error fetching messages:', error); // Error handling
          });
    
          // Cleanup function to unsubscribe on unmount
          return () => {
            unsubscribeRoom();
            unsubscribeMessages(); // Unsubscribe from both listeners
          };
        }
      }, [roomId]); 

    useEffect(() => {
      setSeed(Math.floor(Math.random()*5000))
    }, [roomId])

    // const sendMessage = (e) => {
    //     e.preventDefault()
    //     console.log('you typed >>> ', input)

    //     doc.collection("rooms").doc(roomId).collection("messages").add({
    //         message: input,
    //         name: user.displayName,
    //         timestamp: Timestamp.serverTimestamp()
    //     })

    //     setInput('')
    // }

    const sendMessage = async (e) => {
        e.preventDefault();
    
        if (!input) return; // Handle empty message input (optional)

        try {
          await addDoc(collection(db, "rooms", roomId, "messages"), {
            message: input,
            name: user.displayName,
            timestamp: serverTimestamp(),
          });
          setInput(''); // Clear the input field after successful message sending
        } catch (error) {
          console.error('Error sending message:', error);
          // Handle errors appropriately, e.g., display an error message to the user
        }
      };

    return (
        <div className='chat'>
            <div className="chat__header">
                <Avatar src = {`https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen{" "} 
                       {new Date(
                        messages[messages.length - 1]?.timestamp?.toDate()
                       ).toUTCString()}
                    </p>
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
                {messages.map(message => (
                    <p className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
                    <span className="chat__name">
                        {message.name}
                    </span>
                    {message.message}
                    <span className="chat__timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                </p>
                ))}
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
