'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { CERTIFICATION_DUMMY } from '@/common/constants/certification.dummy'
import { Flex, Heading, List, ListItem } from '@/common/design'

/**
 * 資格一覧画面
 * @screenname ExamListScreen
 * @discription 資格種類を一覧表示する画面
 */

type Props = {
  params: {
    type_id: string
  }
}
export default function ExamListScreen({ params }: Props) {
  const router = useRouter()
  /** cert：資格、type：種類 */
  const [certType, setCertType] = useState<{ id: string; name: string }[]>([])
  useEffect(() => {
    const fetch = async () => {
      let dummyList: { id: string; name: string }[] = []
      CERTIFICATION_DUMMY.filter((item) => {
        if (item.certName === params.type_id) {
          item.certType.map((type) => {
            dummyList.push(type)
          })
        }
      })
      setCertType((prevCertType) => [...prevCertType, ...dummyList])
    }
    fetch()
  }, [])
  const pageTransition = (plt: string) => {
    router.push(`/home/${params.type_id}/${plt}`)
  }
  return (
    <Flex flexDirection='column'>
      <Heading>{params.type_id}</Heading>
      <List>
        {certType?.map((item: { id: string; name: string }) => (
          <ListItem
            key={item.id}
            marginY='5px'
            padding='10px 25px'
            borderRadius='10px'
            border='1px solid #E6E6E6'
            cursor='pointer'
            _hover={{ background: '#E6E6E6' }}
            onClick={() => pageTransition(item.id)}
          >
            {item.name}
          </ListItem>
        ))}
      </List>
    </Flex>
  )
}
