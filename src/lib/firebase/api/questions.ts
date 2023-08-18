import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  query,
  where,
} from 'firebase/firestore'

import { Question } from '@/common/models/question.model'
import { generateUniqueRandomNumbers } from '@/common/utils/generate'
import { db } from '@/lib/config'

/**
 * 資格に紐づく問題の取得
 * @param examTypeId
 * @returns Promise<Question[]>
 */
export const getQuestionsByExamTypeId = async (args: {
  examTypeId: string
  limit: number
}): Promise<Question[]> => {
  /** 選択した資格のdocumentIdを取得する */
  const colRef = collection(db, 'questions')
  const q = query(colRef, where('pltType', 'array-contains', args.examTypeId))
  const querySnapshot = await getDocs(q)
  /** 取得したdocumentIdをもとに問題コレクションにアクセスする */
  const questionColRef = collection(
    db,
    'questions',
    querySnapshot.docs[0].id,
    args.examTypeId
  )
  /** 格納されている全ての問題数を取得する */
  const countOfQuestions: number = await getCountFromServer(
    questionColRef
  ).then((snapshot) => snapshot.data().count)
  /** 出題問題数分の乱数を生成する
   * 乱数の最小値は1、最大値は問題数とする
   */
  const randomNumbers: number[] = generateUniqueRandomNumbers({
    max: countOfQuestions,
    min: 1,
    count: args.limit,
  })
  /** 生成した乱数とquestionIdが一致した問題を配列で取得する */
  const questionQuery = query(
    questionColRef,
    where('questionId', 'in', randomNumbers),
    limit(args.limit)
  )
  const questionQuerySnapshot = await getDocs(questionQuery)
  const questions: Question[] = questionQuerySnapshot.docs.map((doc) => {
    return {
      questionId: doc.data().questionId,
      question: doc.data().question,
      choiceList: doc.data().choiceList || [],
      answerList: doc.data().answerList || [],
      explanation: doc.data().explanation,
    }
  })
  return questions
}
