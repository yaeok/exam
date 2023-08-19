/** firestoreから取得する回答結果 */
export type AnswerResultFromFirestore = {
  /** 正答数 */
  numberOfCorrect: number
  /** 誤答数 */
  numberOfInCorrect: number
  /** 資格タイプId */
  examTypeId: string
  /** 回答結果 */
  inCorrectAnswerList: AnswerInProgress[]
  /** 実施日 */
  executedAt: Date
}

/** 回答中の回答結果 */
export type AnswerInProgress = {
  /** 問題Id */
  id: string
  /** 正解・不正解 */
  result: boolean
}
