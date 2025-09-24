import React, { useContext, useEffect, useRef, useState } from "react";
import { chaticon, sendicon } from "../../assets/export";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../axios";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { profilepic, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const chatbotref = useRef(null);
  console.log(profilepic, "profilepic");
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
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotref.current && !chatbotref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  console.log(messages, "messages");
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
        <div
          className="absolute bottom-[100px] right-12 w-[470px]  h-[500px] bg-white shadow-md rounded-2xl overflow-hidden flex flex-col "
          ref={chatbotref}
        >
          <div className="bg-gradient-to-r from-[#061523] to-[#012C57] h-[66px] text-white flex justify-between items-center p-3">
            <div className="flex items-center mt-2">
              <div>
                <img
                  src={chaticon}
                  alt="Chat Icon"
                  className="w-[70px] h-[70px]"
                />
              </div>
              <div>
                <h3 className="text-[19px] font-[500] mb-2">Chat</h3>
              </div>
            </div>
            <button onClick={toggleChat} className="text-[23.5px]">
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages?.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col items-${
                  msg?.sender === "user" ? "end" : "start"
                }`}
              >
                {console.log(msg.sender, "msg.sender")}
                <div
                  className={`max-w-[85%] flex items-start p-2 break-all overflow-x-hidden rounded-lg`}
                >
                  <div>
                   <div
  className={`max-w-[100%] p-2 pe-4 px-4 whitespace-normal break-keep overflow-x-hidden rounded-lg ${
    msg.sender === "user"
      ? "bg-[#012C57] text-white ml-auto rounded-l-[20px] rounded-tr-[20px]"
      : "bg-gray-200 text-black mr-auto rounded-r-[20px] rounded-tl-[20px]"
  }`}
>
  {msg?.text}
</div>

                    <div
                      className={`text-[12px] font-[500] text-black mt-1 ${
                        msg?.sender === "user" ? "text-end" : "text-start"
                      }`}
                    >
                      {msg?.time}
                    </div>
                  </div>
                  {msg?.sender === "user" &&
                    (profilepic ? (
                      <img
                        src={profilepic}
                        alt="User Avatar"
                        className="w-[42px] h-[42px] ml-2 rounded-full"
                      />
                    ) : (
                      <div className="w-[42px] h-[42px] ml-2 rounded-full bg-[#012C57] flex items-center justify-center text-white font-bold">
                        {user?.name
                          ?.split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                    ))}
                </div>
              </div>
            ))}
            <div ref={messageEndRef}></div>
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
            <div className="relative bg-[#F5F5F5]  flex items-center justify-between h-[49px]  rounded-full ">
              <textarea
                placeholder="Type Here...."
                value={input}
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && handleSend()
                }
                onChange={(e) => {
                  setInput(e.target.value);
                  // e.target.style.height = "49px"; // Reset height
                  // e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`; // Max height 150px
                }}
                className="w-[92%] caret-[#B1B1B1]  leading-[1rem]  bg-transparent placeholder:text-[12px] placeholder:text-[#B1B1B1] outline-none resize-none  px-4  text-gray-800"
                rows={1}
              />
              <div
                onClick={handleSend}
                className="absolute   right-2 bg-gradient-to-r w-[37px] h-[37px] flex items-center justify-center from-[#061523] to-[#012C57] rounded-full cursor-pointer"
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
