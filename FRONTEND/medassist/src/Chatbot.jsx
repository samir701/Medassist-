// import React, { useState, useEffect } from "react";
// import "./assets/css/chat.css";

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "👋 Hello! I’m MediBot. How can I help you today?" }
//   ]);
//   const [input, setInput] = useState("");

//   const openChat = () => setIsOpen(true);
//   const closeChat = () => setIsOpen(false);

//   const handleSend = () => {
//     if (!input.trim()) return;

//     setMessages(prev => [...prev, { sender: "user", text: input }]);
//     setInput("");

//     setTimeout(() => {
//       setMessages(prev => [
//         ...prev,
//         { sender: "bot", text: "🤖 MediBot: Thanks! I’ll help you." }
//       ]);
//     }, 800);
//   };

//   useEffect(() => {
//     const btn = document.querySelector("#btn-bot");
//     if (btn) btn.addEventListener("click", openChat);
//     return () => btn?.removeEventListener("click", openChat);
//   }, []);

//   return (
//     <>
//       {isOpen && (
//         <div className="chatbot-popup">
//           <div className="chatbot-header">
//             <h3>MediBot</h3>
//             <button className="close-btn" onClick={closeChat}>✖</button>
//           </div>

//           <div className="chatbot-messages">
//             {messages.map((msg, i) => (
//               <p key={i} className={msg.sender === "user" ? "user-msg" : "bot-msg"}>
//                 {msg.text}
//               </p>
//             ))}
//           </div>

//           <div className="chatbot-input">
//             <input
//               value={input}
//               onChange={e => setInput(e.target.value)}
//               placeholder="Type your message..."
//             />
//             <button onClick={handleSend}>Send</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Chatbot;

import React, { useState } from "react";
import "./assets/css/chat.css";

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hello! I’m MediBot. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages(prev => [...prev, { sender: "user", text: userMessage }]);
    setInput("");

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: data.reply }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "⚠️ Backend error. Is Flask running?" }
      ]);
    }
  };

  return (
    <div className="chatbot-popup">
      <div className="chatbot-header">
        <h3>MediBot</h3>
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, i) => (
          <p key={i} className={msg.sender === "user" ? "user-msg" : "bot-msg"}>
            {msg.text}
          </p>
        ))}
      </div>

      <div className="chatbot-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={e => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
