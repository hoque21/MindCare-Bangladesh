import React, { useState } from "react";
import chatLogo from "../assets/Logo.jpg"; // your chatbot logo

const ChatBot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  const handleChatSend = () => {
    if (chatInput.trim() === "") return;

    // Add user message
    setChatMessages((prev) => [...prev, { text: chatInput, type: "user" }]);

    // Add bot response after short delay
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { text: "Hello! How can I assist you today?", type: "bot" },
      ]);
    }, 500);

    setChatInput("");
  };

  return (
    <>
      {/* Chat Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        <div
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition overflow-hidden"
        >
          <img
            src={chatLogo}
            alt="AI Chatbot"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

     
      {chatOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-[400px] bg-white shadow-lg rounded-xl flex flex-col overflow-hidden z-50">
          <div className="bg-teal-800 text-white p-4 font-semibold">
            MCare Support
          </div>
          <div className="flex-1 p-2 overflow-y-auto space-y-2">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-md ${
                  msg.type === "user"
                    ? "bg-yellow-100 text-teal-900 self-end"
                    : "bg-teal-100 text-teal-800 self-start"
                } max-w-[80%]`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex p-2 space-x-2 border-t">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded-md px-2 py-1 text-sm"
            />
            <button
              onClick={handleChatSend}
              className="bg-teal-800 text-white px-3 py-1 rounded-md text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
