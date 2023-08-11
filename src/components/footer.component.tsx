'use client'
import NextLink from 'next/link'

import { Box, Button, Container, Flex, Heading, Text } from '@/common/design'

export default function Footer() {
  return (
    <Box bg='gray.50' color='gray.700' as='footer'>
      <Container maxW='4xl' py={4}>
        <Flex justify='space-between' align='center'>
          <Text as='small'>© 2023 yappi</Text>
          <Heading size='sm'>
            <NextLink href='/contact'>お問い合わせ</NextLink>
          </Heading>
        </Flex>
      </Container>
    </Box>
  )
}
