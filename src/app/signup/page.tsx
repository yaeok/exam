'use client'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from '@/common/design'
import { validateSignUpScreen } from '@/common/utils/validate'

/** サインアップ画面
 * @screenname SignUpScreen
 * @description ユーザの新規登録を行う画面
 */
export default function SignUpScreen() {
  const router = useRouter()
  const toast = useToast()
  const { handleSubmit, register } = useForm()

  const [password, setPassword] = useState(false)
  const [confirm, setConfirm] = useState(false)

  const onSubmit = handleSubmit((data) => {
    // バリデーションチェック
    const error = validateSignUpScreen({
      username: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirm,
    })
    if (error.isSuccess) {
      router.push('/signin')
    } else {
      // バリデーションエラー
      toast({
        title: error.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  })

  const passwordClick = () => setPassword(!password)
  const confirmClick = () => setConfirm(!confirm)

  const googleClick = async () => {}

  return (
    <Flex height='100vh' justifyContent='center' alignItems='center'>
      <VStack spacing='5'>
        <Heading>新規登録</Heading>
        <form onSubmit={onSubmit}>
          <VStack alignItems='left'>
            <Box>
              <FormLabel htmlFor='username' textAlign='start'>
                ユーザ名
              </FormLabel>
              <Input id='username' {...register('username')} />
            </Box>
            <Box>
              <FormLabel htmlFor='email' textAlign='start'>
                メールアドレス
              </FormLabel>
              <Input id='email' {...register('email')} />
            </Box>

            <Box>
              <FormLabel htmlFor='password'>パスワード</FormLabel>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type={password ? 'text' : 'password'}
                  {...register('password')}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={passwordClick}>
                    {password ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>

            <Box>
              <FormLabel htmlFor='confirm'>パスワード確認</FormLabel>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type={confirm ? 'text' : 'password'}
                  {...register('confirm')}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={confirmClick}>
                    {confirm ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>

            <Button
              marginTop='4'
              colorScheme='teal'
              type='submit'
              paddingX='auto'
            >
              新規登録
            </Button>
          </VStack>
        </form>
        <Button
          as={NextLink}
          href='/signin'
          bg='white'
          width='100%'
          marginTop='20px'
        >
          ログインはこちらから
        </Button>
      </VStack>
    </Flex>
  )
}
