import React, { useEffect, useRef, useState } from 'react'
import ChatList from './Chatlist/ChatList'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '@/utils/FirebaseConfig'
import { CHECK_USER_ROUTE, GET_MESSAGES_ROUTE, HOST } from '@/utils/ApiRoutes'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useStateProvider } from '@/context/StateContext'
import { reducerCases } from '@/context/constants'
import Chat from './Chat/Chat'
import Empty from './Empty'
import { io } from 'socket.io-client'

function Main () {
  const router = useRouter()
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider()
  const [redirectLogin, setRedirectLogin] = useState(false)
  const socket = useRef()

  useEffect(() => {
    if (redirectLogin) router.push('/login')
  }, [redirectLogin, router])

  onAuthStateChanged(firebaseAuth, async (currentUser) => {
    if (!currentUser) setRedirectLogin(true)
    if (!userInfo && currentUser?.email) {
      const { data } = await axios.post(CHECK_USER_ROUTE, {
        email: currentUser.email
      })
      if (!data.status) {
        router.push('/login')
      }
      console.log({ data })
      if (data?.data) {
        const { id, name, email, profilePicture: profileImage, status } = data.data
        dispatch({
          type: reducerCases.SET_USER_INFO,
          userInfo: {
            id,
            name,
            email,
            profileImage,
            status
          }
        })
      }
    }
  })
  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST)
      socket.current.emit('add-user', userInfo.id)
    }
  }, [userInfo])
  useEffect(() => {
    const getMessages = async () => {
      const { data: { messages } } = await axios.get(`${GET_MESSAGES_ROUTE}/${userInfo?.id}/${currentChatUser?.id}`)
      dispatch({ type: reducerCases.SET_MESSAGES, messages })
    }
    if (currentChatUser?.id && userInfo?.id) { getMessages() }
  }, [currentChatUser, userInfo])
  return (
    <>
      <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full over">
        <ChatList />
        {
          currentChatUser ? <Chat /> : <Empty />
        }
      </div>
    </>
  )
}

export default Main
