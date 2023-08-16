'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'

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
import { answerResultListState } from '@/common/states/answer_result'

/** 完了画面
 * @screenname FinishScreen
 * @description 問題をすべて回答後に表示される画面
 */
export default function FinishScreen() {
  const router = useRouter()
  const result = useRecoilValue(answerResultListState)
  const reset = useResetRecoilState(answerResultListState)
  const correctCount = result.filter((r) => r === true).length
  const incorrectCount = result.filter((r) => r === false).length
  const onClickHome = () => {
    /** TODO:結果を格納する処理 */
    reset()
    router.push('/home')
  }
  return (
    <Flex
      width='100%'
      gap='20px'
      paddingY='10px'
      flexDirection='column'
      justifyContent='center'
    >
      <Heading fontSize='28px'>回答結果</Heading>
      <Text fontSize='18px'>回答お疲れ様でした。</Text>
      <Text fontSize='18px'>資格取得に向けて頑張りましょう！！</Text>
      <TableContainer marginX='10px'>
        <Table>
          <Tbody>
            <Tr paddingY='4px' fontSize='20px'>
              <Td>正答数</Td>
              <Td>{correctCount}問</Td>
            </Tr>
            <Tr paddingY='4px' fontSize='20px'>
              <Td>誤答数</Td>
              <Td>{incorrectCount}問</Td>
            </Tr>
            <Tr paddingY='4px' fontSize='20px'>
              <Td>正答率</Td>
              <Td>{(correctCount / result.length) * 100}%</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Button marginY='20px' onClick={() => onClickHome()}>
        ホームに戻る
      </Button>
    </Flex>
  )
}
