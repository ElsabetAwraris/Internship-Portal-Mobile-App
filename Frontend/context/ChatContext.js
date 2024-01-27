import { createContext, useState } from "react";
import axios from "axios";
import * as SecureStorage from "expo-secure-store";
import { API_URL } from "./AuthContext";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [myIntern, setMyIntern] = useState([]);
  const [myCompany, setMyCompany] = useState([]);

  const fetchChats = async (recipient) => {
    const sender = await SecureStorage.getItemAsync("id");
    const response = await axios.get(`${API_URL}/chat/${sender}/${recipient}`);
    setChats(response.data);
  };

  const sendChat = async (recipient, chatType, chat, role) => {
    const _id = await SecureStorage.getItemAsync("id");

    try {
      const response = await axios.post(`${API_URL}/chat`, {
        sender: _id,
        recipient,
        chatType: "text",
        chat,
        role,
      });
      return response;
    } catch (e) {
      return { error: true, chat: e.response.data.chat };
    }
  };

  const fetchMyIntern = async (recipient) => {
    const sender = await SecureStorage.getItemAsync("id");
    const response = await axios.get(`${API_URL}/company/user/${sender}/`);
    setMyIntern(response.data);
  };
  const fetchMyCompany = async (recipient) => {
    const id = await SecureStorage.getItemAsync("id");

    const response = await axios.get(`${API_URL}/user/company/${id}/`);

    setMyCompany(response.data);
  };

  const valueToShare = {
    chats,
    sendChat,
    fetchChats,
    fetchMyIntern,
    fetchMyCompany,
    myIntern,
    myCompany,
  };

  return (
    <ChatContext.Provider value={valueToShare}>{children}</ChatContext.Provider>
  );
};

export { ChatProvider };

export default ChatContext;
