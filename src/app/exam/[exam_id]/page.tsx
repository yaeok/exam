'use client'

import { useRouter } from 'next/navigation'
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
  /** 出題問題数 */
  const numberOfQuestion = 5
  /** ルーティングを管理するState */
  const router = useRouter()
  /** モーダルを管理するState */
  const { isOpen, onOpen, onClose } = useDisclosure()
  /** firestoreから取得した問題文を管理するState */
  const [question, setQuestion] = useState<Question[]>([])
  /** 画面ローディングを管理するState */
  const [loading, setLoading] = useState<boolean>(true)
  /** 回答数を管理するState（デフォルト値：0） */
  const [numberOfAnswer, setNumberOfAnswer] =
    useRecoilState(numberOfAnswerState)
  /** 回答結果を管理する配列のState */
  const [answers, setAnswers] = useRecoilState(answerResultState)
  /** 回答結果を管理する単一のState */
  const [answerResult, setAnswerResult] = useState<boolean>()
  /** ユーザが選んだ選択肢を管理するState */
  const [selectedChoices, setSelectedChoices] = useState<string[]>([])

  useEffect(() => {
    const fetchQuestion = async () => {
      await getQuestionsByExamTypeId(params.exam_id).then((res: Question[]) => {
        setQuestion(res)
      })
      setLoading(false)
    }
    fetchQuestion()
  }, [])

  /** 選択肢にチェックを付ける処理 */
  const handleCheckboxChange = (choiceId: string) => {
    if (selectedChoices.includes(choiceId)) {
      setSelectedChoices(selectedChoices.filter((id) => id !== choiceId))
    } else {
      setSelectedChoices([...selectedChoices, choiceId])
    }
  }

  /** 回答するボタンを押下 */
  const onClickAnswer = () => {
    /** 選択した回答が正解かどうか調べる */
    const result: boolean = funcMatchSolutions({
      solutions: selectedChoices,
      answerList: question[numberOfAnswer].answerList,
    })
    setAnswerResult(result)
    setAnswers([...answers, result])
    console.log(answers)
    onOpen()
  }

  /** 次の問題へ遷移する */
  const onClickNext = () => {
    if (numberOfQuestion === answers.length) {
      router.push('/exam/finish')
    }
    setSelectedChoices([])
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
              <Button onClick={() => onClickNext()}>
                {answers.length == numberOfQuestion
                  ? '結果を見る'
                  : '次の問題へ'}
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
