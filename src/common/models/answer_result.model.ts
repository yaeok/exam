/** firestoreから取得する回答結果 */
export type AnswerResult = {
  /** 正答数 */
  numberOfCorrect: number
  /** 誤答数 */
  numberOfInCorrect: number
  /** 資格タイプId */
  examTypeId: string
  /** 回答結果 */
  inCorrectAnswerList: boolean[]
  /** 実施日 */
  executedAt: Date
}
