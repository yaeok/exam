'use client'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'

import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from '@/common/design'
import Loading from '@/components/loading.component'
import { signInWithEmail, signInWithGoogle } from '@/lib/firebase/api/auth'

// フォームで使用する変数の型を定義
type formInputs = {
  email: string
  password: string
}

/** サインイン画面
 * @screenname SignInScreen
 * @description ユーザのサインインを行う画面
 */
export default function SignInScreen() {
  const toast = useToast()
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<formInputs>()

  const [show, setShow] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    // バリデーションチェック
    await signInWithEmail({
      email: data.email,
      password: data.password,
    }).then((res) => {
      if (res.isSuccess) {
        router.push('/home')
        toast({
          title: 'ログインに成功しました',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
      } else {
        toast({
          title: res.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }
    })
    setLoading(false)
  })
  const onClickGoogle = async () => {
    await signInWithGoogle().then((res) => {
      if (res.isSuccess) {
        router.push('/home')
        toast({
          title: res.message,
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
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
            <FormControl isInvalid={Boolean(errors.email)}>
              <FormLabel htmlFor='email' textAlign='start'>
                メールアドレス
              </FormLabel>
              <Input
                id='email'
                {...register('email', {
                  required: '必須項目です',
                  maxLength: {
                    value: 50,
                    message: '50文字以内で入力してください',
                  },
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@+[a-zA-Z0-9-]+\.+[a-zA-Z0-9-]+$/,
                    message: 'メールアドレスの形式が違います',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.password)}>
              <FormLabel htmlFor='password'>パスワード</FormLabel>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  {...register('password', {
                    required: '必須項目です',
                    minLength: {
                      value: 8,
                      message: '8文字以上で入力してください',
                    },
                    maxLength: {
                      value: 50,
                      message: '50文字以内で入力してください',
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])[0-9a-zA-Z]*$/,
                      message:
                        '半角英数字かつ少なくとも1つの大文字を含めてください',
                    },
                  })}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              marginTop='4'
              color='white'
              bg='teal.400'
              _hover={{ bg: 'teal.500' }}
              isLoading={isSubmitting}
              type='submit'
              paddingX='auto'
            >
              ログイン
            </Button>
            <Button
              as={NextLink}
              bg='white'
              color='black'
              href='/signup'
              width='100%'
            >
              新規登録はこちらから
            </Button>
            <Divider />
            <Flex
              flexDirection='column'
              width='100%'
              justifyContent='center'
              alignItems='center'
            >
              <Button
                leftIcon={<FcGoogle />}
                bg='gray.100'
                width='100%'
                onClick={() => onClickGoogle()}
                transition='all: .3s'
                _hover={{
                  top: '-3px',
                  boxShadow: '0 2px 3px rgba(0, 0, 0, 0.3)',
                }}
              >
                Sign in with Google
              </Button>
            </Flex>
          </VStack>
        </form>
      </VStack>
    </Flex>
  )
}
