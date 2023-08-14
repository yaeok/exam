/** 資格のプラットフォーム */
export type Certification = {
  pltName: string
  pltPath: string
  isActive: boolean
  examType: ExamType[]
}

/** 資格種類 */
export type ExamType = {
  examTypeId: string
  examTypeName: string
  isActive: boolean
}
