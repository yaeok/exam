'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { userState } from '@/common/states/user'

/**
 * ナビゲーション画面
 * @screenname NavigationScreen
 * @discription ログインしているかを判断し、ログインしていればホーム画面に遷移する
 */
export default function Navigation() {
  const router = useRouter()
  /** ログインユーザ */
  const user = useRecoilValue(userState)

  useEffect(() => {
    if (user) {
      router.replace('/home')
    } else {
      router.replace('/signin')
    }
  }, [])

  return null
}
