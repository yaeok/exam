'use client'

import { useEffect, useState } from 'react'

import { DUMMY_QUESTION } from '@/common/constants/question.dummy'
import {
  Button,
  Checkbox,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
} from '@/common/design'
import { Question } from '@/common/models/question.model'

/** 問題出題画面
 * @screenname ExamScreen
 * @description 資格の問題を出題する画面
 */
export default function ExamScreen() {
  const [question, setQuestion] = useState<Question[]>(DUMMY_QUESTION)
  useEffect(() => {
    const fetchQuestion = async () => {}
    fetchQuestion()
  }, [])
  return (
    <Flex
      width='100%'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      gap='10px'
    >
      <Flex width='100%' justifyContent='start'>
        <Heading size='lg'>{question[0].qid}問</Heading>
      </Flex>
      <Text border='1px solid #E6E6E6' padding='10px' borderRadius='10px'>
        {question[0].question}
      </Text>
      <List>
        {question[0].choiceList.map((choice) => (
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
      <Button width='100%'>回答する</Button>
    </Flex>
  )
}
