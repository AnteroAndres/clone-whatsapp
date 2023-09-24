import React from "react";
import ChatListHeader from "../Chatlist/ChatListHeader";
import SearchBar from "../Chatlist/SearchBar";
import List from "../Chatlist/List";

function Chat() {
  return (
  <div className="bg-panel-header-background flex flex-col max-h-screen z-20">
    <>
    <ChatListHeader/>
    <SearchBar/>
    <List/>
    </>
    </div>
    );
}

export default Chat;
