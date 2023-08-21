'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
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
  useToast,
} from '@/common/design'
import { answerResultListState } from '@/common/states/answer_result'
import Loading from '@/components/loading.component'
import { setAnswerResult } from '@/lib/firebase/api/users'

type Props = {
  params: {
    exam_id: string
  }
}

/** 完了画面
 * @screenname FinishScreen
 * @description 問題をすべて回答後に表示される画面
 */
export default function FinishScreen({ params }: Props) {
  const router = useRouter()
  const toast = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  /** 回答結果 */
  const result = useRecoilValue(answerResultListState)
  const reset = useResetRecoilState(answerResultListState)
  /** 正解数 */
  const correctCount = result.filter((r) => r.result === true).length
  /** 誤答数 */
  const incorrectCount = result.filter((r) => r.result === false).length
  const onClickHome = async () => {
    setLoading(true)
    await setAnswerResult({
      correctCount: correctCount,
      incorrectCount: incorrectCount,
      examTypeId: params.exam_id,
      inCorrectAnswerList: result,
    }).then((res) => {
      if (res) {
        toast({
          title: '結果を保存しました',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        router.push('/home')
        reset()
      } else {
        toast({
          title: '結果の保存に失敗しました。',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
        setLoading(false)
      }
    })
  }
  return loading ? (
    <Loading />
  ) : (
    <Flex
      width='100%'
      gap='20px'
      paddingY='5px'
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
              <Td>{Math.round((correctCount / result.length) * 100)}%</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Flex width='100%' flexDirection='column' justifyContent='start'>
        <Button marginY='20px' onClick={() => onClickHome()}>
          結果を保存してホームに戻る
        </Button>
        <Text fontSize='14px'>※ボタンを押さなかった場合、保存されません。</Text>
      </Flex>
    </Flex>
  )
}
