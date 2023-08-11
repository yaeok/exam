'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { List, ListItem } from '@chakra-ui/react'

/**
 * ホーム画面
 * @screenname HomeScreen
 * @discription 資格プラットフォームを一覧表示する画面
 */

/** ダミーの資格プラットフォーム */
const certPltList = ['Salesforce', 'Google', 'AWS', 'Microsoft', 'Oracle']
export default function HomeScreen() {
  const router = useRouter()
  /** cert：資格、plt：プラットフォーム */
  const [certPlt, setCertPlt] = useState<string[]>()
  useEffect(() => {
    setCertPlt(certPltList)
  }, [])
  const pageTransition = (plt: string) => {
    router.push(`/home/${plt}`)
  }
  return (
    <List>
      {certPlt?.map((item: string) => (
        <ListItem
          key={item}
          marginY='5px'
          padding='10px 25px'
          borderRadius='10px'
          border='1px solid #E6E6E6'
          cursor='pointer'
          _hover={{ background: '#E6E6E6' }}
          onClick={() => pageTransition(item)}
        >
          {item}
        </ListItem>
      ))}
    </List>
  )
}
