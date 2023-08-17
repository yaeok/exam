import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore'

import { AnswerResult } from '@/common/models/answer_result.model'
import { User } from '@/common/models/user.model'
import { auth, db } from '@/lib/config'

/**
 * ユーザIdからユーザ情報を取得する
 * @param uid
 * @returns Promise<User>
 */
export const getUserInfoByUid = async (args: {
  uid: string
}): Promise<User> => {
  let result: User = { uid: '', username: '', email: '' }
  try {
    const docRef = doc(db, 'users', args.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      result = {
        uid: docSnap.data().uid,
        username: docSnap.data().username,
        email: docSnap.data().email,
      }
    }
  } catch (error) {
    console.error(error)
  }
  return result
}

/**
 * 回答結果を格納する処理
 * @param uid
 * @param correctCount
 * @param incorrectCount
 * @param correctAnswerRate
 * @param examTypeId
 * @param inCorrectAnswerList
 * @return Promise<boolean>
 */
export const setAnswerResult = async (args: {
  correctCount: number
  incorrectCount: number
  examTypeId: string
  inCorrectAnswerList: boolean[]
}): Promise<boolean> => {
  let result = false
  const user = auth.currentUser
  try {
    const colRef = collection(db, 'users', user!.uid, 'results')
    await addDoc(colRef, {
      numberOfCorrect: args.correctCount,
      numberOfInCorrect: args.incorrectCount,
      examTypeId: args.examTypeId,
      inCorrectAnswerList: args.inCorrectAnswerList,
      executedAt: serverTimestamp(),
    }).then(() => {
      result = true
    })
  } catch (error) {
    console.error(error)
  }
  return result
}

/**
 * 全ての回答結果を取得する
 * @returns Promise<AnswerResult[]>
 */
export const getAllAnswerResultFromUid = async (): Promise<AnswerResult[]> => {
  const user = auth.currentUser
  const colRef = collection(db, 'users', user!.uid, 'results')
  const querySnapshot = await getDocs(colRef)
  const result: AnswerResult[] = []
  querySnapshot.forEach((doc) => {
    const timestamp = doc.data().executedAt.seconds
    const date = new Date(parseInt(timestamp, 10) * 1000)
    result.push({
      numberOfCorrect: doc.data().numberOfCorrect,
      numberOfInCorrect: doc.data().numberOfInCorrect,
      examTypeId: doc.data().examTypeId,
      inCorrectAnswerList: doc.data().inCorrectAnswerList,
      executedAt: date,
    })
  })
  return result
}
