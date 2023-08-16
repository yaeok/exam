/** 問題 */
export type Question = {
  /** 問題ID */
  questionId: string
  /** 問題文 */
  question: string
  /** 解説 */
  explanation: string
  /** 選択肢 */
  choiceList: Choice[]
  /** 解答リスト */
  answerList: string[]
}

/** 選択肢 */
export type Choice = {
  id: string
  choice: string
}
