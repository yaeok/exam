'use client'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import {
  Button,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from '@/common/design'
import { AnswerResultFromFirestore } from '@/common/models/answer_result.model'
import { userState } from '@/common/states/user'
import { funcCalculation } from '@/common/utils/calculation'
import Calendar from '@/components/calendar.component'
import Loading from '@/components/loading.component'
import { getAllAnswerResultFromUid } from '@/lib/firebase/api/users'

/** プロフィール画面
 * @screenname ProfileScreen
 * @description ユーザ情報を表示する画面
 */
export default function ProfileScreen() {
  const user = useRecoilValue(userState)
  const [answerResultList, setAnswerResultList] = useState<
    AnswerResultFromFirestore[]
  >([])
  const [loading, setLoading] = useState<boolean>(true)
  const [correctCount, setCorrectCount] = useState<number>(0)
  const [inCorrectCount, setInCorrectCount] = useState<number>(0)
  const [correctAnswerRate, setCorrectAnswerRate] = useState<number>(0)
  useEffect(() => {
    const fetchAnswerResultList = async () => {
      await getAllAnswerResultFromUid().then(
        (data: AnswerResultFromFirestore[]) => {
          if (data.length === 0) return
          setAnswerResultList(data)
          const { correctCount, inCorrectCount, correctAnswerRate } =
            funcCalculation(data)
          setCorrectCount(correctCount)
          setInCorrectCount(inCorrectCount)
          setCorrectAnswerRate(correctAnswerRate)
        }
      )
      setLoading(false)
    }
    fetchAnswerResultList()
  }, [])
  return loading ? (
    <Loading />
  ) : (
    <Flex flexDirection='column' width='100%' gap='18px' paddingY='5px'>
      <Flex width='100%' flexDirection='row' justifyContent='space-between'>
        <Heading fontSize='22px'>プロフィール</Heading>
        <Button as={NextLink} href='/profile/update'>
          更新
        </Button>
      </Flex>
      <Flex width='100%' flexDirection='row' alignItems='center' gap='20px'>
        <Heading fontSize='18px'>ユーザ名：</Heading>
        <Text fontSize='18px'>{user?.username}</Text>
      </Flex>
      <Flex width='100%' flexDirection='row' alignItems='center' gap='20px'>
        <Heading fontSize='18px'>定期メール：</Heading>
        <Text fontSize='18px'>
          {user?.permSendEmail ? '受け取る' : '受け取らない'}
        </Text>
      </Flex>
      <Flex
        width={{ base: '100%', sm: '100%', md: '100%', lg: '60%' }}
        justifyContent='center'
        alignItems='center'
        marginX={{ base: '0px', md: 'auto' }}
      >
        <Calendar answerList={answerResultList} />
      </Flex>
      {answerResultList.length === 0 ? (
        <Text textAlign='center'>結果がまだありません</Text>
      ) : (
        <TableContainer marginX='10px'>
          <Table>
            <Tbody>
              <Tr>
                <Td>正答数</Td>
                <Td>{correctCount}問</Td>
              </Tr>
              <Tr>
                <Td>誤答数</Td>
                <Td>{inCorrectCount}問</Td>
              </Tr>
              <Tr>
                <Td>正答率</Td>
                <Td>{correctAnswerRate}%</Td>
              </Tr>
              <Tr>
                <Td>回答数</Td>
                <Td>{correctCount + inCorrectCount}問</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Flex>
  )
}
