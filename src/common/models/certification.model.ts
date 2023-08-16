/** 資格のプラットフォーム */
export type Certification = {
  /** プラットフォーム名 */
  pltName: string
  /** プラットフォームパス */
  pltPath: string
  /** プラットフォーム有効化 */
  isActive: boolean
  /** 資格の種類 */
  examType: ExamType[]
}

/** 資格種類 */
export type ExamType = {
  /** 資格のタイプId */
  examTypeId: string
  /** 資格のタイプ名 */
  examTypeName: string
  /** 資格有効化 */
  isActive: boolean
}
