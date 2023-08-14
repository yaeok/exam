'use client'

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
  return (
    <Flex width='100%' flexDirection='column' gap='20px'>
      <Heading size='lg'>お問い合わせ</Heading>
      <Flex width='100%' flexDirection='column' gap='10px'>
        <Heading size='sm'>よくあるお問い合わせ</Heading>
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
        <Heading size='sm'>Email・SNS</Heading>
        <Text>Email: yaeok.engneer@gmail.com</Text>
        <Text>SNS: [twitter]</Text>
      </Flex>
      <Flex width='100%' flexDirection='column' gap='5px'>
        <Heading size='sm'>お問い合わせフォーム</Heading>
        <Text>お問い合わせ内容を入力してください</Text>
        <Button>入力フォームへ</Button>
      </Flex>
    </Flex>
  )
}
