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
  useToast,
} from '@/common/design'
import { Choice, Question } from '@/common/models/question.model'
import { answerResultListState } from '@/common/states/answer_result'
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
  const numberOfQuestion = Number.parseInt(
    process.env.NEXT_PUBLIC_FIREBASE_NUMBER_OF_QUESTIONS!
  )
  /** ルーティングを管理するState */
  const router = useRouter()
  /** トースト通知を管理するState */
  const toast = useToast()
  /** モーダルを管理するState */
  const { isOpen, onOpen, onClose } = useDisclosure()
  /** firestoreから取得した問題文を管理するState */
  const [question, setQuestion] = useState<Question[]>([])
  /** 画面ローディングを管理するState */
  const [loading, setLoading] = useState<boolean>(true)
  /** 回答結果を管理する単一のState */
  const [answerResult, setAnswerResult] = useState<boolean>()
  /** ユーザが選んだ選択肢を管理するState */
  const [selectedChoices, setSelectedChoices] = useState<string[]>([])

  /** 回答数を管理するState（デフォルト値：0） */
  const [numberOfAnswer, setNumberOfAnswer] =
    useRecoilState(numberOfAnswerState)
  /** 回答結果を管理する配列のState */
  const [answers, setAnswers] = useRecoilState(answerResultListState)

  useEffect(() => {
    const fetchQuestion = async () => {
      await getQuestionsByExamTypeId({
        examTypeId: params.exam_id,
        limit: numberOfQuestion,
      }).then((res: Question[]) => {
        setQuestion(res)
      })
      setLoading(false)
    }
    fetchQuestion()
  }, [])

  /** 選択肢にチェックを付ける処理 */
  const handleCheckboxChange = (choiceId: string) => {
    if (selectedChoices.includes(choiceId)) {
      /** 既に選択しているCheckboxがタップされたら配列から削除 */
      setSelectedChoices(selectedChoices.filter((id) => id !== choiceId))
    } else {
      /** 未選択のCheckboxがタップされたら配列に格納 */
      if (
        selectedChoices.length >= question[numberOfAnswer].answerList.length
      ) {
        /** 正解数と同じ数だけ選択できるように制御 */
        return toast({
          title: `${question[numberOfAnswer].answerList.length}つ選択してください`,
          status: 'info',
          position: 'top',
          duration: 2000,
          isClosable: true,
        })
      } else {
        /** 条件をクリアして配列に格納 */
        setSelectedChoices([...selectedChoices, choiceId])
      }
    }
  }

  /** 回答するボタンを押下 */
  const onClickAnswer = () => {
    if (selectedChoices.length === 0) {
      toast({
        title: '回答が選択されていません',
        status: 'error',
        position: 'top',
        duration: 2000,
        isClosable: true,
      })
      return
    }
    /** 選択した回答が正解かどうか調べる */
    const result: boolean = funcMatchSolutions({
      solutions: selectedChoices,
      answerList: question[numberOfAnswer].answerList,
    })
    /** 単一回答の結果を格納 */
    setAnswerResult(result)
    /** 回答記録配列に結果を追加 */
    setAnswers([
      ...answers,
      { id: question[numberOfAnswer].questionId, result: result },
    ])
    onOpen()
  }

  /** 次の問題へ遷移する */
  const onClickNext = () => {
    if (numberOfQuestion === answers.length) {
      setLoading(true)
      /** 出題問題数は一定して50問とし、50問出題されたら完了画面に遷移する */
      router.replace(`/exam/${params.exam_id}/finish`)
      setNumberOfAnswer(0)
    } else {
      /** 選択状態を空にする */
      setSelectedChoices([])
      onClose()
      setNumberOfAnswer(numberOfAnswer + 1)
    }
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
      <Flex width='100%' justifyContent='start' paddingY='10px'>
        <Text textAlign='left'>
          {question[numberOfAnswer].answerList.length}つ選択
        </Text>
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
          onChange={() => handleCheckboxChange(choice.id)}
          isChecked={selectedChoices.includes(choice.id)}
        >
          {choice.id}
          {'. '}
          {choice.choice}
        </Checkbox>
      ))}
      <Button width='100%' marginTop='20px' onClick={() => onClickAnswer()}>
        回答する
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent margin='20px'>
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
                <Heading size='sm'>回答：</Heading>
                {question[numberOfAnswer].answerList.map(
                  (item: string, index: number) => (
                    <Text key={index}>{item}</Text>
                  )
                )}
              </Flex>
              <Text fontSize='12px'>
                {question[numberOfAnswer].explanation}
              </Text>
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
