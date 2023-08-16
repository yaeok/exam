'use client'

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
import { userState } from '@/common/states/user'
import Calendar from '@/components/calendar.component'

/** プロフィール画面
 * @screenname ProfileScreen
 * @description ユーザ情報を表示する画面
 */
export default function ProfileScreen() {
  const user = useRecoilValue(userState)
  return (
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
        <Calendar articleList={[]} />
      </Flex>
      <TableContainer marginX='10px'>
        <Table>
          <Tbody>
            <Tr>
              <Td>正答数</Td>
              <Td>20問</Td>
            </Tr>
            <Tr>
              <Td>正答率</Td>
              <Td>50%</Td>
            </Tr>
            <Tr>
              <Td>誤答数</Td>
              <Td>20問</Td>
            </Tr>
            <Tr>
              <Td>回答数</Td>
              <Td>40問</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  )
}
