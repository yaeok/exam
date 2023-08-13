import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'

import { FirebaseResult } from '@/common/models/firebase_result.model'
import { auth, db } from '@/lib/config'

type FirebaseError = {
  code: string
  message: string
  name: string
}

const isFirebaseError = (e: Error): e is FirebaseError => {
  return 'code' in e && 'message' in e
}

/**
 * EmailとPasswordでサインイン
 * @param email
 * @param password
 */
export const signInWithEmail = async (args: {
  email: string
  password: string
}): Promise<FirebaseResult> => {
  let result: FirebaseResult = { isSuccess: false, message: '' }
  try {
    const user = await signInWithEmailAndPassword(
      auth,
      args.email,
      args.password
    ).then((userCredential) => {
      const docRef = doc(db, 'users', userCredential.user.uid)
      updateDoc(docRef, {
        uid: userCredential.user.uid,
        loginAt: serverTimestamp(),
      })
      return userCredential.user
    })

    if (user) {
      result = { isSuccess: true, message: 'ログインに成功しました' }
    }
  } catch (error) {
    if (
      error instanceof Error &&
      isFirebaseError(error) &&
      error.code === 'auth/user-not-found'
    ) {
      result = { isSuccess: false, message: 'ユーザが見つかりませんでした' }
    } else if (
      error instanceof Error &&
      isFirebaseError(error) &&
      error.code === 'auth/wrong-password'
    ) {
      result = { isSuccess: false, message: 'パスワードが間違っています' }
    } else {
      result = { isSuccess: false, message: 'ログインに失敗しました' }
    }
  }
  return result
}

/**
 * Googleアカウントでサインイン
 */
export const signInWithGoogle = async (): Promise<FirebaseResult> => {
  let result: FirebaseResult = { isSuccess: false, message: '' }
  const provider = new GoogleAuthProvider()
  try {
    const user = await signInWithPopup(auth, provider).then(
      async (userCredential) => {
        const docRef = doc(db, 'users', userCredential.user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          updateDoc(docRef, {
            uid: userCredential.user.uid,
            username: userCredential.user.displayName,
          })
        } else {
          await setDoc(docRef, {
            uid: userCredential.user.uid,
            username: userCredential.user.displayName,
            createdAt: serverTimestamp(),
          })
        }
        return userCredential.user
      }
    )
    if (user) {
      result = { isSuccess: true, message: 'ログインに成功しました' }
    }
  } catch (error) {
    result = { isSuccess: false, message: 'ログインに失敗しました' }
  }
  return result
}

/**
 * EmailとPasswordでサインアップ
 * @param username
 * @param email
 * @param password
 */
export const signUpWithEmail = async (args: {
  username: string
  email: string
  password: string
}): Promise<FirebaseResult> => {
  let result: FirebaseResult = { isSuccess: false, message: '' }
  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      args.email,
      args.password
    ).then(async (userCredential) => {
      const docRef = doc(db, 'users', userCredential.user.uid)
      await setDoc(docRef, {
        uid: userCredential.user.uid,
        username: args.username,
        createdAt: serverTimestamp(),
      })
      return userCredential.user
    })
    if (user) {
      result = { isSuccess: true, message: '新規登録に成功しました' }
    }
  } catch (error) {
    if (
      error instanceof Error &&
      isFirebaseError(error) &&
      error.code === 'auth/email-already-in-use'
    ) {
      result = {
        isSuccess: false,
        message: 'メールアドレスが既に使用されています',
      }
    } else {
      result = { isSuccess: false, message: '新規登録に失敗しました' }
    }
  }
  return result
}

/**
 * ログアウト処理
 */
export const logout = async (): Promise<FirebaseResult> => {
  let result: FirebaseResult = { isSuccess: false, message: '' }

  await signOut(auth)
    .then(() => {
      result = { isSuccess: true, message: 'ログアウトしました' }
    })
    .catch((error) => {
      result = { isSuccess: false, message: error.message }
    })

  return result
}
