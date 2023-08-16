'use client'

import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import {
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from '@/common/design'
import { AnswerResult } from '@/common/models/answer_result.model'
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
  const [answerResultList, setAnswerResultList] = useState<AnswerResult[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [correctCount, setCorrectCount] = useState<number>(0)
  const [inCorrectCount, setInCorrectCount] = useState<number>(0)
  const [correctAnswerRate, setCorrectAnswerRate] = useState<number>(0)
  useEffect(() => {
    const fetchAnswerResultList = async () => {
      await getAllAnswerResultFromUid().then((data: AnswerResult[]) => {
        setAnswerResultList(data)
        const { correctCount, inCorrectCount, correctAnswerRate } =
          funcCalculation(data)
        setCorrectCount(correctCount)
        setInCorrectCount(inCorrectCount)
        setCorrectAnswerRate(correctAnswerRate)
      })
      setLoading(false)
    }
    fetchAnswerResultList()
  }, [])
  return loading ? (
    <Loading />
  ) : (
    <Flex flexDirection='column' width='100%' gap='18px' paddingY='20px'>
      <Heading fontSize='22px'>プロフィール</Heading>
      <Flex width='100%' flexDirection='row' alignItems='center' gap='20px'>
        <Heading fontSize='18px'>ユーザ名：</Heading>
        <Text fontSize='18px'>{user?.username}</Text>
      </Flex>
      <Flex
        width={{ base: '100%', md: '70%' }}
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
                <Td>
                  {answerResultList[0].inCorrectAnswerList.length *
                    answerResultList.length}
                  問
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Flex>
  )
}
