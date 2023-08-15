/** 問題 */
export type Question = {
  questionId: string
  question: string
  choiceList: Choice[]
  answerList: string[]
  explanation: string
}

/** 選択肢 */
export type Choice = {
  id: string
  choice: string
}
