'use client'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'

import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  VStack,
} from '@/common/design'
import { validateSignInScreen } from '@/common/utils/validate'
import Loading from '@/components/loading.component'
import { signInWithEmail, signInWithGoogle } from '@/lib/firebase/api/auth'

/** サインイン画面
 * @screenname SignInScreen
 * @description ユーザのサインインを行う画面
 */
export default function SignInScreen() {
  const toast = useToast()
  const router = useRouter()
  const { handleSubmit, register } = useForm()
  const [show, setShow] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    // バリデーションチェック
    const error = validateSignInScreen(data.email, data.password)
    if (error.isSuccess) {
      await signInWithEmail({
        email: data.email,
        password: data.password,
      }).then((res) => {
        if (res.isSuccess) {
          toast({
            title: 'ログインに成功しました',
            status: 'success',
            duration: 2000,
            isClosable: true,
          })
          router.push('/home')
        } else {
          toast({
            title: res.message,
            status: 'error',
            duration: 2000,
            isClosable: true,
          })
        }
      })
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
  const onClickGoogle = async () => {
    await signInWithGoogle().then((res) => {
      if (res.isSuccess) {
        toast({
          title: 'ログインに成功しました',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        router.push('/home')
      } else {
        toast({
          title: res.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }
    })
  }
  return loading ? (
    <Loading />
  ) : (
    <Flex
      flexDirection='column'
      width='100%'
      height='100vh'
      justifyContent='center'
      alignItems='center'
    >
      <VStack spacing='5'>
        <Heading>ログイン</Heading>
        <form onSubmit={onSubmit}>
          <VStack spacing='4' alignItems='left'>
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
                  type={show ? 'text' : 'password'}
                  {...register('password')}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                    {show ? 'Hide' : 'Show'}
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
              ログイン
            </Button>
            <Flex
              flexDirection='column'
              width='100%'
              justifyContent='center'
              alignItems='center'
            >
              <Icon
                as={FcGoogle}
                marginTop='20px'
                width='6'
                height='6'
                cursor='pointer'
                onClick={() => onClickGoogle()}
              />
              <Button
                as={NextLink}
                href='/signup'
                bg='white'
                width='100%'
                marginTop='20px'
              >
                新規登録はこちらから
              </Button>
            </Flex>
          </VStack>
        </form>
      </VStack>
    </Flex>
  )
}
