'use client'

import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { DUMMY_QUESTION } from '@/common/constants/question.dummy'
import {
  Button,
  Checkbox,
  Flex,
  Heading,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@/common/design'
import { Question } from '@/common/models/question.model'
import { numberOfAnswerState } from '@/common/states/number_of_answer'

type Props = {
  params: {
    exam_id: string
  }
}

/** 問題出題画面
 * @screenname ExamScreen
 * @description 資格の問題を出題する画面
 */
export default function ExamScreen({ params }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [question, setQuestion] = useState<Question[]>(DUMMY_QUESTION)
  const [numberOfAnswer, setNumberOfAnswer] =
    useRecoilState(numberOfAnswerState)
  useEffect(() => {
    const fetchQuestion = async () => {}
    fetchQuestion()
  }, [])
  const onClickAnswer = () => {
    onOpen()
  }
  const onClickNext = () => {
    onClose()
    setNumberOfAnswer(numberOfAnswer + 1)
  }
  return (
    <Flex
      width='100%'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      gap='10px'
    >
      <Flex width='100%' justifyContent='start'>
        <Heading size='lg'>{numberOfAnswer + 1}問</Heading>
      </Flex>
      <Text border='1px solid #E6E6E6' padding='10px' borderRadius='10px'>
        {question[numberOfAnswer].question}
      </Text>
      <List>
        {question[numberOfAnswer].choiceList.map((choice) => (
          <ListItem
            key={choice.id}
            marginY='5px'
            padding='10px 25px'
            borderRadius='10px'
            border='1px solid #E6E6E6'
            cursor='pointer'
            _hover={{ background: '#E6E6E6' }}
          >
            <Checkbox colorScheme='blue'>
              {choice.id}
              {'. '}
              {choice.choice}
            </Checkbox>
          </ListItem>
        ))}
      </List>
      <Button width='100%' onClick={() => onClickAnswer()}>
        回答する
      </Button>
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
              <Heading size='lg' textAlign='center'>
                正解
              </Heading>
              <Flex flexDirection='row' alignContent='start' gap='10px'>
                {question[numberOfAnswer].answerList.map(
                  (item: string, index: number) => (
                    <Text key={index}>{item}</Text>
                  )
                )}
              </Flex>
              <Button onClick={() => onClickNext()}>次の問題へ</Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
