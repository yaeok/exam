import { doc, getDoc } from 'firebase/firestore'

import { User } from '@/common/models/user.model'
import { db } from '@/lib/config'

/**
 * ユーザIdからユーザ情報を取得する
 * @param uid
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
