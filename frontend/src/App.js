import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io.connect("http://localhost:5000");

function App() {
  // room state
  const [room, setRoom] = useState("");

  // message state
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceivedMessage(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <input
        placeholder="room number"
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>JOIN</button>
      <br></br>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {receivedMessage}
    </div>
  );
}

export default App;
