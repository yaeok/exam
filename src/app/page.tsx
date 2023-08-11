'use client'
import NextLink from 'next/link'

import { Flex } from '@chakra-ui/react'

/**
 * ナビゲーション画面
 * @screenname NavigationScreen
 * @discription ログインしているかを判断し、ログインしていればホーム画面に遷移する
 */
export default function Navigation() {
  return (
    <Flex justifyContent='center' alignItems='center'>
      <h1>ナビゲーション</h1>
      <NextLink href={'/home'}>ホーム画面へ</NextLink>
    </Flex>
  )
}
