'use client'

import { useRouter } from 'next/navigation'

import {
  Button,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from '@/common/design'

/** 完了画面
 * @screenname FinishScreen
 * @description 問題をすべて回答後に表示される画面
 */
export default function FinishScreen() {
  const router = useRouter()
  return (
    <Flex
      width='100%'
      gap='10px'
      paddingY='10px'
      flexDirection='column'
      justifyContent='center'
    >
      <Heading>Finish</Heading>
      <TableContainer marginX='10px'>
        <Table>
          <Tbody>
            <Tr>
              <Td>正答数</Td>
              <Td>20問</Td>
            </Tr>
            <Tr>
              <Td>誤答数</Td>
              <Td>20問</Td>
            </Tr>
            <Tr>
              <Td>正答率</Td>
              <Td>50%</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Button onClick={() => router.push('/home')}>ホームに戻る</Button>
    </Flex>
  )
}
