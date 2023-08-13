'use client'

import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { messageState } from '@/common/states/message';
import { userState } from '@/common/states/user';
import Loading from '@/components/loading.component';
import { auth } from '@/lib/config';
import { getUserInfoByUid } from '@/lib/firebase/api/user';

export const AuthContext = createContext({})

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useRecoilState(userState)
  const [loading, setLoading] = useState(true)
  const setMessage = useSetRecoilState(messageState)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserInfoByUid({ uid: user.uid }).then((userInfo) => {
          setMessage(true)
          setUser({
            uid: userInfo.uid,
            username: user.displayName!,
          })
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  )
}
