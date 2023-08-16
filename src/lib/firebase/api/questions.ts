import { collection, getDocs, limit, query, where } from 'firebase/firestore'

import { Question } from '@/common/models/question.model'
import { db } from '@/lib/config'

/**
 * 資格に紐づく問題の取得
 * @param examTypeId
 * @returns Promise<Question[]>
 */
export const getQuestionsByExamTypeId = async (
  examTypeId: string
): Promise<Question[]> => {
  const colRef = collection(db, 'questions')
  const q = query(colRef, where('pltType', 'array-contains', examTypeId))
  const querySnapshot = await getDocs(q)
  const questionColRef = collection(
    db,
    'questions',
    querySnapshot.docs[0].id,
    examTypeId
  )
  const questionQuery = query(questionColRef, limit(5))
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
