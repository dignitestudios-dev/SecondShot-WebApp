import React, { useContext, useState } from "react";
import { chaticon, sendicon } from "../../assets/export";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../axios";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { profilepic } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (input.trim() === "" || loading) return;
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages([
      ...messages,
      { text: input, sender: "user", time: timestamp },
    ]);
    setInput("");
    setLoading(true);
    try {
      const response = await axios.post("/api/user/chat-with-bot", {
        message: input,
      });
      if (response.status === 200) {
        const botTimestamp = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        setMessages((prev) => [
          ...prev,
          { text: response?.data?.data, sender: "bot", time: botTimestamp },
        ]);
      }
    } catch (error) {
      console.error("Error fetching bot response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-1 right-4 z-50">
      <div onClick={toggleChat} className="cursor-pointer">
        <img
          src={chaticon}
          alt="Chat Icon"
          className="w-[100px] h-[100px] rounded-full"
        />
      </div>

      {isOpen && (
        <div className="fixed bottom-[100px] right-12 w-[398px] h-[450px] bg-white shadow-md rounded-2xl overflow-hidden flex flex-col z-10">
          <div className="bg-gradient-to-r from-[#061523] to-[#012C57] h-[66px] text-white flex justify-between items-center px-4">
            <div className="flex items-center mt-2">
              <img
                src={chaticon}
                alt="Chat Icon"
                className="w-[57px] h-[57px]"
              />
              <h3 className="text-[22px] font-[500] mb-3">Chat</h3>
            </div>
            <button onClick={toggleChat} className="text-[23.5px]">
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col items-${
                  msg.sender === "user" ? "end" : "start"
                }`}
              >
                <div
                  className={`max-w-[75%] flex items-start p-2 break-all overflow-x-hidden rounded-lg`}
                >
                  <div>
                    <div
                      className={`max-w-[100%] p-2 break-all overflow-x-hidden rounded-lg ${
                        msg.sender === "user"
                          ? "bg-[#012C57] text-white ml-auto rounded-l-[20px] rounded-tr-[20px]"
                          : "bg-gray-200 text-black mr-auto rounded-r-[20px] rounded-tl-[20px]"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div
                      className={`text-[12px] font-[500] text-black mt-1 ${
                        msg.sender === "user" ? "text-end" : "text-start"
                      }`}
                    >
                      {msg.time}
                    </div>
                  </div>
                  {msg.sender === "user" && (
                    <img
                      src={profilepic}
                      alt="User Avatar"
                      className="w-[42px] h-[42px] ml-2 rounded-full"
                    />
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-start justify-start">
                <div className="max-w-[75%] p-2 rounded-lg bg-gray-200 text-black mr-auto rounded-r-[20px] rounded-tl-[20px] animate-pulse">
                  <div className="w-[120px] h-4 bg-gray-300 mb-2 rounded"></div>
                  <div className="w-[90px] h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-2 w-full bottom-0 bg-white">
            <div className="relative">
              <input
                type="text"
                placeholder="Type Here...."
                value={input}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-2 h-[49px] placeholder:text-[12px] px-4 bg-[#F5F5F5] text-gray-800 rounded-full outline-none"
              />
              <div
                onClick={handleSend}
                className="absolute bottom-2 right-2 bg-gradient-to-r w-[37px] h-[37px] flex items-center justify-center from-[#061523] to-[#012C57] rounded-full cursor-pointer"
              >
                {loading ? (
                  <div className="animate-pulse w-5 h-5 bg-[#F5F5F5] rounded-full"></div>
                ) : (
                  <img
                    src={sendicon}
                    className="w-[22.21px] h-[22.21px]"
                    alt="Send"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
