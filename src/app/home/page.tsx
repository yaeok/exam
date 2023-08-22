'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useResetRecoilState } from 'recoil'

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
import { Certification, ExamType } from '@/common/models/certification.model'
import { answerResultListState } from '@/common/states/answer_result'
import { numberOfAnswerState } from '@/common/states/number_of_answer'
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

  /** 回答数を管理するState（デフォルト値：0） */
  const resetNumberOfAnswer = useResetRecoilState(numberOfAnswerState)
  /** 回答結果を管理する配列のState */
  const resetAnswer = useResetRecoilState(answerResultListState)
  useEffect(() => {
    const fetch = async () => {
      await getAllCertifications().then((res: Certification[]) => {
        setCertifications(res)
      })
    }
    fetch()
  }, [])
  const pageTransition = () => {
    onClose()
    resetNumberOfAnswer()
    resetAnswer()
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
          {certification.examType
            .filter((value) => value.isActive === true)
            .map((exam: ExamType, index: number) => {
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
              <Button
                _hover={{
                  borderColor: 'transparent',
                  boxShadow: '0 7px 10px rgba(0, 0, 0, 0.3)',
                }}
                onClick={() => pageTransition()}
              >
                スタート
              </Button>
              <Flex
                width='100%'
                bg='red.200'
                padding='10px'
                borderRadius='10px'
                flexDirection='column'
                justifyContent='start'
              >
                <Text
                  paddingY='5px'
                  fontSize='16px'
                  textAlign='center'
                  fontWeight='bold'
                >
                  注意事項
                </Text>
                <Text fontSize='14px'>
                  出題される問題はあくまで予想問題であり、
                  必ずしも試験本番に出題されるとは限りません。
                </Text>
                <Text fontSize='14px'>
                  また、本アプリで出力される解答・解説については、
                  個人で調査を実施した結果であるため、
                  必ずしも正しい解答とは限りません。
                </Text>
                <Text fontSize='14px'>
                  上記をご理解頂いたうえで、ご利用ください。
                </Text>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Accordion>
  )
}
