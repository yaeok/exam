import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore'

import { FirebaseResult } from '@/common/models/firebase_result.model'
import { auth, db } from '@/lib/config'

import { getUserInfoByUid } from './users'

/**
 * お問合せの送信
 * @param title
 * @param content
 * @returns Promise<FirebaseResult>
 */
export const postContact = async (args: {
  title: string
  content: string
}): Promise<FirebaseResult> => {
  let result: FirebaseResult = {
    isSuccess: false,
    message: '',
  }
  const user = auth.currentUser
  const colRef = collection(db, 'contacts')
  const userInfo = await getUserInfoByUid({ uid: user!.uid })
  if (userInfo) {
    await addDoc(colRef, {
      contactTitle: args.title,
      contactContent: args.content,
      createdAt: serverTimestamp(),
      contactFrom: {
        uid: userInfo.uid,
        username: userInfo.username,
        email: userInfo.email,
      },
    }).then(() => {
      result = {
        isSuccess: true,
        message: 'お問い合わせを送信しました。',
      }
    })
  } else {
    result = {
      isSuccess: false,
      message: 'ユーザ情報の取得に失敗しました。',
    }
  }
  return result
}
