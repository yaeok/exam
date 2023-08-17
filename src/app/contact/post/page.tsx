'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
  VStack,
} from '@/common/design'
import { validateContactScreen } from '@/common/utils/validate'
import { postContact } from '@/lib/firebase/api/contacts'

/** お問い合わせ送信画面
 * @screenname PostContactScreen
 * @description お問い合わせを送信する画面
 */
export default function PostContactScreen() {
  const router = useRouter()
  const toast = useToast()
  const { handleSubmit, register } = useForm()
  const onSubmit = handleSubmit(async (data) => {
    const result = validateContactScreen({
      title: data.title,
      content: data.content,
    })

    if (result.isSuccess) {
      await postContact({ title: data.title, content: data.content }).then(
        (res) => {
          if (res.isSuccess) {
            toast({
              title: res.message,
              description: '貴重なご意見ありがとうございます',
              status: 'success',
              duration: 2000,
              isClosable: true,
            })
            router.back()
          } else {
            toast({
              title: res.message,
              status: 'error',
              duration: 2000,
              isClosable: true,
            })
          }
        }
      )
    } else {
      // バリデーションエラー
      toast({
        title: result.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  })
  return (
    <Flex flexDirection='column' width='100%' gap='24px' paddingY='5px'>
      <Heading fontSize='22px'>お問い合わせフォーム</Heading>
      <form onSubmit={onSubmit}>
        <VStack alignItems='left'>
          <Box>
            <FormLabel htmlFor='title' textAlign='start'>
              タイトル
            </FormLabel>
            <Input id='title' {...register('title')} />
          </Box>
          <Box>
            <FormLabel htmlFor='content' textAlign='start'>
              お問い合わせ内容
            </FormLabel>
            <Textarea id='content' {...register('content')} />
          </Box>

          <Button
            marginTop='4'
            colorScheme='teal'
            type='submit'
            paddingX='auto'
          >
            送信
          </Button>
          <Button marginTop='4' paddingX='auto' onClick={() => router.back()}>
            戻る
          </Button>
        </VStack>
      </form>
    </Flex>
  )
}
