'use client'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'

import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@/common/design'
import { logout } from '@/lib/firebase/api/auth'

export default function Header() {
  const router = useRouter()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const onClickLogout = async () => {
    await logout().then((res) => {
      if (res.isSuccess) {
        toast({
          title: 'ログアウトしました',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        router.push('/signin')
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
  return (
    <Box as='header' position={'sticky'} top={0} zIndex={'docked'}>
      <Flex
        bg='white'
        color='gray.600'
        minH='60px'
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle='solid'
        borderColor='gray.200'
        align='center'
      >
        <Flex flex={1} justify='space-between' maxW='container.xl' mx='auto'>
          <Heading as='h1' size='xl'>
            <NextLink href='/home'>shikakun</NextLink>
          </Heading>
          <Avatar
            size='md'
            src='public/images/user_icon.png'
            cursor='pointer'
            onClick={onOpen}
          />
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent marginX='20px'>
          <ModalBody>
            <Flex
              width='100%'
              flexDirection='column'
              gap='10px'
              paddingY='10px'
            >
              <Button>プロフィール画面</Button>
              <Button>お問い合わせ画面</Button>
              <Button
                bg='red.400'
                color='black'
                _hover={{ bg: 'red.500', color: 'white' }}
                onClick={() => onClickLogout()}
              >
                ログアウト
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
