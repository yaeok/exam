/** 問題 */
export type Question = {
  qid: string
  question: string
  choiceList: Choice[]
  answerList: string[]
}

/** 選択肢 */
export type Choice = {
  id: string
  choice: string
}
