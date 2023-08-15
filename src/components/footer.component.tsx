'use client'
import NextLink from 'next/link'

import { Box, Container, Flex, HStack, Text } from '@/common/design'

export default function Footer() {
  return (
    <Box bg='gray.50' color='gray.700' as='footer'>
      <Container maxW='4xl' py={4}>
        <Flex justify='space-between' align='center'>
          <Text fontSize='12px'>© 2023 yappi</Text>
          <HStack spacing={4}>
            <NextLink href='/contact'>
              <Text fontSize='12px'>お問い合わせ</Text>
            </NextLink>
            <NextLink href='/profile'>
              <Text fontSize='12px'>プロフィール</Text>
            </NextLink>
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}
