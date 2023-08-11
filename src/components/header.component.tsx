'use client'
import NextLink from 'next/link'

import { Box, Flex, Heading } from '@/common/design'

export default function Header() {
  return (
    <Box as='header' position={'sticky'} top={0} zIndex={'docked'}>
      <Flex
        bg='white'
        color='gray.600'
        minH='60px'
        py={{ base: 2 }}
        px={{ base: 150 }}
        borderBottom={1}
        borderStyle='solid'
        borderColor='gray.200'
        align='center'
      >
        <Flex flex={1} justify='space-between' maxW='container.xl' mx='auto'>
          <Heading as='h1' size='lg'>
            <NextLink href='/'>shikakun</NextLink>
          </Heading>
        </Flex>
      </Flex>
    </Box>
  )
}
