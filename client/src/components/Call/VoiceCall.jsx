import { useStateProvider } from '@/context/StateContext'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'

const Container = dynamic(() => import('./Container'), { ssr: false })

function VoiceCall () {
  const [{ VoiceCall, socket, userInfo }] = useStateProvider()

  useEffect(() => {
    if (VoiceCall && VoiceCall.callType === 'out-going') {
      socket.current.emit('outgoing-voice-call', {
        to: VoiceCall.id,
        from: {
          id: userInfo.id,
          profilePicture: userInfo.profileImage,
          name: userInfo.name
        },
        callType: VoiceCall.callType,
        roomId: VoiceCall.roomId
      })
    }
  }, [VoiceCall])

  return <Container data={VoiceCall} />
}

export default VoiceCall
