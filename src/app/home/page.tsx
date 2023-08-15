'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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
  useDisclosure,
} from '@/common/design'
import { Certification, ExamType } from '@/common/models/certification.model'
import { getAllCertifications } from '@/lib/firebase/api/certifications'

/**
 * ホーム画面
 * @screenname HomeScreen
 * @discription 資格プラットフォームを一覧表示する画面
 */

export default function HomeScreen() {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [certifications, setCertifications] = useState<Certification[]>([])
  /** 資格の選択 */
  const [choicePlt, setChoicePlt] = useState<string>('')
  const [choiceCert, setChoiceCert] = useState<string>('')
  const [examId, setExamId] = useState<string>('')
  useEffect(() => {
    const fetch = async () => {
      await getAllCertifications().then((res: Certification[]) => {
        console.log(res[0].examType[0])
        setCertifications(res)
      })
    }
    fetch()
  }, [])
  const pageTransition = () => {
    onClose()
    router.push(`/exam/${examId}`)
  }
  const onClickConfirm = (plt: string, cert: string, examId: string) => {
    setChoicePlt(plt)
    setChoiceCert(cert)
    setExamId(examId)
    onOpen()
  }
  return (
    <Accordion allowToggle>
      {certifications?.map((certification: Certification, index: number) => (
        <AccordionItem key={index}>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                {certification.pltName}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          {certification.examType.map((exam: ExamType, index: number) => {
            return (
              <AccordionPanel
                pb={4}
                key={index}
                cursor='pointer'
                onClick={() =>
                  onClickConfirm(
                    certification.pltName,
                    exam.examTypeName,
                    exam.examTypeId
                  )
                }
              >
                {exam.examTypeName}
              </AccordionPanel>
            )
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
