'use client'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'

import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Switch,
  Text,
  useToast,
  VStack,
} from '@/common/design'
import { userState } from '@/common/states/user'
import { validateUpdateProfileScreen } from '@/common/utils/validate'
import { updateUserInfo } from '@/lib/firebase/api/users'

/** プロフィール更新画面
 * @screenname UpdateProfileScreen
 * @description ユーザ情報を更新する画面
 */
export default function UpdateProfileScreen() {
  const toast = useToast()
  const router = useRouter()
  const [user, setUser] = useRecoilState(userState)
  const [check, setCheck] = useState<boolean>(user!.permSendEmail)
  const { handleSubmit, register } = useForm()
  const onSubmit = handleSubmit(async (data) => {
    const result = validateUpdateProfileScreen(data.username)
    if (result.isSuccess) {
      await updateUserInfo({
        username: data.username,
        permSendEmail: check,
      }).then((res) => {
        if (res.isSuccess) {
          setUser((prevState) => ({
            ...prevState!,
            username: data.username,
            permSendEmail: check,
          }))
          router.replace('/profile')
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
    <Flex flexDirection='column' width='100%' gap='18px' paddingY='5px'>
      <Flex width='100%' flexDirection='row' justifyContent='space-between'>
        <Heading fontSize='22px'>プロフィール更新</Heading>
        <Button as={NextLink} href='/profile'>
          戻る
        </Button>
      </Flex>
      <form onSubmit={onSubmit}>
        <VStack spacing='4' alignItems='left'>
          <Box>
            <FormLabel htmlFor='username' textAlign='start'>
              ユーザ名
            </FormLabel>
            <Input
              defaultValue={user?.username}
              id='username'
              {...register('username')}
            />
          </Box>
          <Box>
            <FormLabel htmlFor='permSendEmail' textAlign='start'>
              定期メールを受け取る
            </FormLabel>
            <Flex flexDirection='row' alignItems='center' gap='10px'>
              <Switch
                defaultChecked={user?.permSendEmail}
                size='md'
                colorScheme='teal'
                onChange={() => setCheck(!check)}
              />
              <Text>{check ? '受け取る' : '受け取らない'}</Text>
            </Flex>
          </Box>
        </VStack>
        <Button width='100%' marginTop='4' colorScheme='teal' type='submit'>
          更新する
        </Button>
      </form>
    </Flex>
  )
}
