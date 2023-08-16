'use client'

import { useRouter } from 'next/navigation'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  Text,
} from '@/common/design'

/** お問い合わせ画面
 * @screenname ContactScreen
 * @description お問い合わせに関する画面
 */
export default function ContactScreen() {
  const router = useRouter()
  return (
    <Flex width='100%' flexDirection='column' gap='24px' paddingY='20px'>
      <Heading fontSize='22px'>お問い合わせ</Heading>
      <Flex width='100%' flexDirection='column' gap='10px'>
        <Heading fontSize='18px'>よくあるお問い合わせ</Heading>
        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as='span' flex='1' textAlign='left'>
                  テストボタン
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>テスト</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
      <Flex width='100%' flexDirection='column' gap='5px'>
        <Heading fontSize='18px'>Email・SNS</Heading>
        <Text fontSize='14px'>Email: yaeok.engneer@gmail.com</Text>
        <Text fontSize='14px'>SNS: [twitter]</Text>
      </Flex>
      <Flex width='100%' flexDirection='column' gap='5px'>
        <Heading fontSize='18px'>お問い合わせフォーム</Heading>
        <Text fontSize='14px'>お問い合わせ内容を入力してください</Text>
        <Button onClick={() => router.push('/contact/post')}>
          入力フォームへ
        </Button>
      </Flex>
    </Flex>
  )
}
