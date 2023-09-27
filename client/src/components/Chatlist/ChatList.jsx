import React, { useEffect, useState } from 'react'
import ChatListHeader from '../Chatlist/ChatListHeader'
import SearchBar from '../Chatlist/SearchBar'
import List from '../Chatlist/List'
import { useStateProvider } from '@/context/StateContext'
import ContactsList from './ContactsList'

function ChatList () {
  const [{ contactsPage }] = useStateProvider()
  const [pageType, setPageType] = useState('default')

  useEffect(() => {
    if (contactsPage) {
      setPageType('all-contacts')
    } else {
      setPageType('default')
    }
  }, [contactsPage])
  return (
    <div className="bg-panel-header-background flex flex-col max-h-screen z-20">
      {pageType === 'default' && (
        <>
          <ChatListHeader />
          <SearchBar />
          <List />
        </>
      )}
      {pageType === 'all-contacts' && <ContactsList/>}
    </div>
  )
}

export default ChatList
