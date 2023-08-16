'use client'

import { useRouter } from 'next/navigation'
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
  const result = useRecoilValue(answerResultListState)
  const reset = useResetRecoilState(answerResultListState)
  const correctCount = result.filter((r) => r === true).length
  const incorrectCount = result.filter((r) => r === false).length
  const onClickHome = async () => {
    await setAnswerResult({
      correctCount: correctCount,
      incorrectCount: incorrectCount,
      correctAnswerRate: (correctCount / result.length) * 100,
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
        reset()
        router.push('/home')
      } else {
        toast({
          title: '結果の保存に失敗しました。',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }
    })
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
