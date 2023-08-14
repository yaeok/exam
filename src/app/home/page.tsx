'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { CERTIFICATION_DUMMY } from '@/common/constants/certification.dummy'
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
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@/common/design'

/**
 * ホーム画面
 * @screenname HomeScreen
 * @discription 資格プラットフォームを一覧表示する画面
 */

export default function HomeScreen() {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  /** cert：資格、plt：プラットフォーム、type：資格種類 */
  const [certPlt, setCertPlt] = useState<string[]>([])
  const [certType, setCertType] = useState<
    { pltName: string; id: string; typeName: string }[]
  >([])
  const [choicePlt, setChoicePlt] = useState<string>('')
  const [choiceCert, setChoiceCert] = useState<string>('')
  const [examId, setExamId] = useState<string>('')
  useEffect(() => {
    const fetch = async () => {
      setCertPlt(CERTIFICATION_DUMMY.map((item) => item.pltName))
      const dummyList: { pltName: string; id: string; typeName: string }[] = []

      CERTIFICATION_DUMMY.map((item) => {
        item.certType.map((cert) => {
          dummyList.push({
            pltName: item.pltName,
            id: cert.id,
            typeName: cert.name,
          })
        })
      })
      setCertType(dummyList)
    }
    fetch()
  }, [])
  const pageTransition = () => {
    onClose()
    router.push(`/exam/${examId}`)
  }
  const onClickConfirm = (plt: string, cert: string, exam_id: string) => {
    setChoicePlt(plt)
    setChoiceCert(cert)
    setExamId(exam_id)
    onOpen()
  }
  return (
    <Accordion>
      {certPlt?.map((item: string, index: number) => (
        <AccordionItem key={index}>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                {item}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          {certType.map((cert) => {
            if (cert.pltName === item) {
              return (
                <AccordionPanel
                  pb={4}
                  key={cert.id}
                  cursor='pointer'
                  onClick={() => onClickConfirm(item, cert.typeName, cert.id)}
                >
                  {cert.typeName}
                </AccordionPanel>
              )
            }
          })}
        </AccordionItem>
      ))}
      <Modal isOpen={isOpen} onClose={onClose} size='lg' isCentered>
        <ModalOverlay />
        <ModalContent marginX='20px'>
          <ModalBody>
            <Flex
              width='100%'
              flexDirection='column'
              gap='25px'
              paddingY='10px'
            >
              <Heading size='md' textAlign='center'>
                {choicePlt}
              </Heading>
              <Heading size='sm' textAlign='center'>
                {choiceCert}
              </Heading>
              <Button onClick={() => pageTransition()}>スタート</Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Accordion>
  )
}
