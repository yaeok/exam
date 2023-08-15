import { collection, getDocs, query, where } from 'firebase/firestore'

import { Certification, ExamType } from '@/common/models/certification.model'
import { db } from '@/lib/config'

/**
 * 資格リストの取得
 * @returns 資格のリスト
 */
export const getAllCertifications = async () => {
  const colRef = collection(db, 'certifications')
  const q = query(colRef, where('isActive', '==', true))
  const querySnapshot = await getDocs(q)
  const certifications: Certification[] = querySnapshot.docs.map((doc) => {
    return {
      pltName: doc.data().pltName,
      pltPath: doc.data().pltPath,
      isActive: doc.data().isActive,
      examType: doc.data().examType,
    } as Certification
  })
  return certifications
}
