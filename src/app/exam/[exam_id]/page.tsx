'use client'

import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import {
  Button,
  Checkbox,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@/common/design'
import { Choice, Question } from '@/common/models/question.model'
import { answerResultState } from '@/common/states/answer_result'
import { numberOfAnswerState } from '@/common/states/number_of_answer'
import { funcMatchSolutions } from '@/common/utils/match'
import Loading from '@/components/loading.component'
import { getQuestionsByExamTypeId } from '@/lib/firebase/api/questions'

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
  const [question, setQuestion] = useState<Question[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [numberOfAnswer, setNumberOfAnswer] =
    useRecoilState(numberOfAnswerState)
  const [answers, setAnswers] = useRecoilState(answerResultState)
  const [answerResult, setAnswerResult] = useState<boolean>()
  const [selectedChoices, setSelectedChoices] = useState<string[]>([])

  const handleCheckboxChange = (choiceId: string) => {
    if (selectedChoices.includes(choiceId)) {
      setSelectedChoices(selectedChoices.filter((id) => id !== choiceId))
    } else {
      setSelectedChoices([...selectedChoices, choiceId])
    }
  }
  useEffect(() => {
    const fetchQuestion = async () => {
      await getQuestionsByExamTypeId(params.exam_id).then((res: Question[]) => {
        setQuestion(res)
      })
      setLoading(false)
    }
    fetchQuestion()
  }, [])
  const onClickAnswer = () => {
    const result = funcMatchSolutions({
      solutions: selectedChoices,
      answerList: question[numberOfAnswer].answerList,
    })
    setAnswerResult(result)
    setAnswers([...answers, result])
    onOpen()
  }
  const onClickNext = () => {
    onClose()
    setNumberOfAnswer(numberOfAnswer + 1)
  }
  return loading ? (
    <Loading />
  ) : (
    <Flex
      width='100%'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      gap='5px'
    >
      <Flex width='100%' justifyContent='start'>
        <Heading size='lg'>{numberOfAnswer + 1}問</Heading>
      </Flex>
      <Flex
        width='100%'
        justifyContent='start'
        border='1px solid #E6E6E6'
        padding='10px'
        borderRadius='10px'
      >
        <Text>{question[numberOfAnswer].question}</Text>
      </Flex>
      {question[numberOfAnswer].choiceList.map((choice: Choice) => (
        <Checkbox
          key={choice.id}
          width='100%'
          colorScheme='blue'
          padding='10px 25px'
          borderRadius='10px'
          border='1px solid #E6E6E6'
          cursor='pointer'
          // _hover={{ background: '#E6E6E6' }}
          onChange={() => handleCheckboxChange(choice.id)}
          isChecked={selectedChoices.includes(choice.id)}
        >
          {choice.id}
          {'. '}
          {choice.choice}
        </Checkbox>
      ))}
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
                {answerResult ? '正解' : '不正解'}
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
